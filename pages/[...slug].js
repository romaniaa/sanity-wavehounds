import React from 'react'
import {getStaticPagePaths, getStaticPageProps} from "../lib/vital";
import {filterDataToSingleItem, usePreviewSubscription} from "../lib/sanity";
import PageContent from "../components/PageContent";
import VitalImage from "../components/blocks/VitalImage";


/**
 * Makes Next.js aware of all the slugs it can expect at this route
 *
 */
export async function getStaticPaths() {
    const paths = await getStaticPagePaths()

    return {
        paths,
        fallback: false,
    }
}

/**
 * Fetch the data from Sanity based on the current slug
 */
export async function getStaticProps({params, preview = false}) {
    // get the last slug in the array
    const slug = params.slug[params.slug.length - 1]
    const props = await getStaticPageProps(slug, preview)

    // Escape hatch, if our query failed to return pageData
    if (!props.pageData) return {notFound: true}

    return {
        props: {
            // Pass down the "preview mode" boolean to the client-side
            preview,
            // Pass down the page props
            ...props
        }
    }
}

export default function Page({pageData, preview}) {

    const {data: previewData} = usePreviewSubscription(pageData?.query, {
        params: pageData?.queryParams ?? {},
        // The hook will return this on first render
        // This is why it's important to fetch *draft* content server-side!
        initialData: pageData?.page,
        // The passed-down preview context determines whether this function does anything
        enabled: preview,
    })

    const page = filterDataToSingleItem(previewData, preview)

    // Notice the optional?.chaining conditionals wrapping every piece of content?
    // This is extremely important as you can't ever rely on a single field
    // of data existing when Editors are creating new documents.
    // It'll be completely blank when they start!
    return (
        <div className={'container px-10 mx-auto space-y-10'}>
            {page.media &&
                <div className={'w-full pb-[50%] relative'}>
                    <VitalImage value={page.media} sizes={'100vw'} fill className={'object-cover'} priority={true} />
                    <div className={'absolute w-full h-full bg-black/20'}></div>
                    {page?.title && <h1 className={'absolute bottom-0 left-0 text-white'}>{page.title}</h1>}
                </div>
            }
            <PageContent page={page}/>
        </div>
    )
}