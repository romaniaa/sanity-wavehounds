import React from 'react'
import {filterDataToSingleItem, usePreviewSubscription} from "../../lib/sanity";
import PageContent from "../../components/PageContent";
import {getGlobalProps} from "../../lib/vital";
import newsPost from '../../lib/newsPost'
import Breadcrumbs from "../../components/Breadcrumbs";
import PostDate from "../../components/PostDate";
import Link from "next/link";
import VitalImage from "../../components/blocks/VitalImage";

/**
 * Makes Next.js aware of all the slugs it can expect at this route
 *
 */
export async function getStaticPaths() {
    const paths = await newsPost.getPaths()
    return {
        paths,
        fallback: false,
    }
}

/**
 * Fetch the data from Sanity based on the current slug
 */
export async function getStaticProps({params, preview = false}) {

    // get all the global props used on every page (site settings, menus)
    const globalProps = await getGlobalProps()

    // get the props used for this post
    const postProps = await newsPost.getProps(params.slug, preview)

    // Escape hatch, if our query failed to return postData
    if (!postProps.pageData) return {notFound: true}

    return {
        props: {
            // Pass down the "preview mode" boolean to the client-side
            preview,
            // Pass down the props
            ...globalProps,
            ...postProps
        }
    }
}

export default function Post({pageData, preview}) {

    const {data: previewData} = usePreviewSubscription(pageData?.query, {
        params: pageData?.queryParams ?? {},
        // The hook will return this on first render
        // This is why it's important to fetch *draft* content server-side!
        initialData: pageData?.page,
        // The passed-down preview context determines whether this function does anything
        enabled: preview,
    })

    const post = filterDataToSingleItem(previewData, preview)

    // Notice the optional?.chaining conditionals wrapping every piece of content?
    // This is extremely important as you can't ever rely on a single field
    // of data existing when Editors are creating new documents.
    // It'll be completely blank when they start!
    return (
        <div className={'container px-10 mx-auto'}>
            {post?.title && <h1>{post.title}</h1>}
            <Breadcrumbs page={post}/>
            <PostDate date={post.publishDate} className={'block my-5'} />
            {post.category &&
                <Link href={newsPost.buildCategoryPermalink(post.category)}>{post.category.title}</Link>
            }
            {post.media &&
                <div className={'w-full pb-[66%] relative'}>
                    <VitalImage value={post.media} sizes={'100vw'} fill className={'object-cover'} priority={true} />
                </div>
            }

            <PageContent page={post} />
        </div>
    )
}