// attempts to automatically set the page slug from the title
// queries if it already exists and adds a number onto the end if it does
// following example from https://www.sanity.io/docs/document-actions

import {useEffect, useState} from 'react'
import {useDocumentOperation} from '@sanity/react-hooks'
const slugify = require('slugify')
import sanityClient from 'part:@sanity/base/client';
const client = sanityClient.withConfig({ apiVersion: '2021-10-21' });

export default function SetSlugAndPublish(props) {
    const {patch, publish} = useDocumentOperation(props.id, props.type)
    const [isPublishing, setIsPublishing] = useState(false)

    useEffect(() => {
        // if the isPublishing state was set to true and the draft has changed
        // to become `null` the document has been published
        if (isPublishing && !props.draft) {
            setIsPublishing(false)
        }
    }, [props.draft])

    return {
        disabled: publish.disabled,
        label: isPublishing ? 'Publishing…' : 'Publish',
        onHandle: async () => {
            // This will update the button text
            setIsPublishing(true)

            // only attempt to automatically set a slug if one is not currently set and there is a title
            // the page slug should not change when a user updates the page title of an existing page
            if (props.draft?.title && props.draft?.slug === undefined) {
                // build a slug from the title
                let slug = slugify(props.draft.title, {lower: true, strict: true})

                let tryCount = 1
                let newSlug = null
                let success = false
                // check if the slug exists by querying for a page with the generated slug
                // repeat while success is false
                do {
                    const exists = await client.fetch(`*[_type == '${props.type}' && slug.current == '${newSlug || slug}'][0]`)
                    if (exists !== null) {
                        // if it exists, build a new slug with an incrementing number on the end
                        tryCount++
                        newSlug = `${slug}-${tryCount}`
                    } else {
                        // update the slug field with the built value
                        success = true
                        patch.execute([{set: {slug: {_type: 'slug', current: newSlug || slug}}}])
                    }
                } while (!success)
            }

            // Perform the publish
            publish.execute()

            // Signal that the action is completed
            props.onComplete()
        }
    }
}