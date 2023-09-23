// accepts a webhook from sanity when a page gets updated and triggers a rebuild of that page
// mostly copied from https://github.com/sanity-io/webhook-toolkit

import {isValidSignature, SIGNATURE_HEADER_NAME} from '@sanity/webhook'
import {Buffer} from "buffer";

const secret = process.env.SANITY_REVALIDATE_TOKEN

export default async function handler(req, res) {

    // validate that it's a post request
    if (req.method !== "POST") {
        console.error("Must be a POST request")
        return res.status(401).json({ message: "Must be a POST request" })
    }

    // validate that the webhook came from sanity
    const signature = req.headers[SIGNATURE_HEADER_NAME]
    const body = await readBody(req) // Read the body into a string
    if (!isValidSignature(body, signature, secret)) {
        res.status(401).json({success: false, message: 'Invalid signature'})
        return
    }

    try {
        // build the full path string so we can tell next.js which path to rebuild
        const jsonBody = JSON.parse(body)
        const slugs = [jsonBody.slug]
        if (jsonBody.parent) slugs.push(jsonBody.parent)
        if (jsonBody.grandparent) slugs.push(jsonBody.grandparent)
        const path = slugs.reverse().join('/')

        await res.revalidate(`/${path}`)

        return res.json({ revalidated: true, path })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
    api: {
        bodyParser: false,
    },
}

async function readBody(readable) {
    const chunks = []
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
    }
    return Buffer.concat(chunks).toString('utf8')
}