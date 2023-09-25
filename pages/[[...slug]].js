import React, {lazy} from 'react'
import {getGlobalProps, getStaticPagePaths, preparePageData} from "../lib/vital";
import {PreviewSuspense} from 'next-sanity/preview'
import PageContent from "../components/PageContent";
import {sanityClient} from '../lib/sanity.client'
import {pageQuery} from "../lib/sanity.data";
import HomeTemplate from "../components/templates/HomeTemplate";

const PageContentPreview = lazy(() => import('../components/PageContentPreview'))

export async function getStaticPaths() {
    const paths = await getStaticPagePaths()
    return {
        paths,
        fallback: 'blocking',
    }
}

export const getStaticProps = async ({params, preview = false, previewData = {}}) => {
    // get global props every page needs (site settings, menus)
    const globalProps = await getGlobalProps()

    // get the last slug in the url to find the current page
    let slug = params.slug && params.slug[params.slug.length - 1]

    // get the homepage setting
    const homePageSetting = globalProps.siteSettings?.homePage

    const isHome = slug === undefined || slug === 'index'

    // if no slug is set, set the slug to the homepage setting
    if  (isHome && homePageSetting) {
        slug = homePageSetting
    }

    // if still no slug is set, use fallback homepage template
    if (slug === undefined) {
        return {
            props: {
                fallback: true,
                ...globalProps
            }
        }
    }

    // use the slug in sanity query params
    const queryParams = {slug}

    // if we're in preview mode, return preview-specific props
    if (preview && previewData?.token) {
        return {
            props: {
                preview,
                token: previewData.token,
                query: pageQuery,
                queryParams,
                ...globalProps
            }
        }
    }

    // we're not in preview mode, query sanity for the page data
    const data = await sanityClient.fetch(pageQuery, queryParams)

    // display a 404 if the query came back empty
    if (!data || data.length === 0) return {notFound: true}

    const pageData = await preparePageData(data, false)

    // return the preview status, page data, and global props
    return {
        props: {
            pageData,
            ...globalProps
        }
    }
}

export default function Page({fallback, pageData, query, queryParams, preview, token}) {

    if (fallback) {
        return <HomeTemplate/>
    }

    const previewContent = (
        <PreviewSuspense fallback="Loading...">
            <PageContentPreview token={token} query={query} params={queryParams} />
        </PreviewSuspense>
    )

    const content = (
        <PageContent data={pageData} />
    )

    return (
        <>
            {preview ? previewContent : content}
        </>
    )
}