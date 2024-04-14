import React, {lazy} from 'react'
import PageContent from "../../components/PageContent";
import {getGlobalProps, preparePageData} from "../../lib/main";
import {getPaths, getPostQuery} from '../../lib/newsPost'
import {sanityClient} from "../../lib/sanity.client";
import {PreviewSuspense} from "next-sanity/preview";

const PageContentPreview = lazy(() => import('../../components/PageContentPreview'))

export async function getStaticPaths() {
    const paths = await getPaths()
    return {
        paths,
        fallback: 'blocking',
    }
}

export async function getStaticProps({params, preview = false, previewData = {}}) {
    const slug = params.slug
    const queryParams = {slug}
    const globalProps = await getGlobalProps()

    if (preview && previewData?.token) {
        return {
            props: {
                preview,
                token: previewData.token,
                query: getPostQuery(),
                queryParams,
                ...globalProps
            }
        }
    }
    
    const data = await sanityClient.fetch(getPostQuery(), queryParams)
    if (!data || data.length === 0) return {notFound: true}

    const pageData = await preparePageData(data, false)

    return {
        props: {
            preview,
            pageData,
            ...globalProps
        }
    }
}

export default function Post({pageData, query, queryParams, preview, token}) {

    const previewContent = (
        <PreviewSuspense fallback="Loading...">
            <PageContentPreview token={token} query={query} params={queryParams} />
        </PreviewSuspense>
    )

    const content = (
        <PageContent data={pageData}/>
    )

    return (
        <>
            {preview ? previewContent : content}
        </>
    )
}