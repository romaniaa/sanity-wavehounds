import Head from "next/head"
import newsPost from "../lib/newsPost";
import { urlFor } from "../lib/sanity";
import { buildPermalink } from "../lib/vital";
import {useAppContext} from "./ContextWrapper";
import MetaTitle from "./MetaTitle";
import MetaDescription from "./MetaDescription";
import MetaKeywords from "./MetaKeywords";

export default function MetaTags() {

    const {pageProps} = useAppContext()
    const {siteSettings, pageData} = pageProps

    const imageUrl = pageData?.media?.asset?.url || siteSettings?.socialSharingImage?.asset?.url || null
    const description = siteSettings?.siteDescription || pageData?.metadata?.description || null

    const pageUrl = (data) => {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

        if (data?._type === 'page' && siteSettings?.homePage === data?.slug?.current)
            return siteUrl

        switch(data._type) {
            case 'NewsCategory':
                return siteUrl + newsPost.buildCategoryPermalink(data.category);
            default:
                return siteUrl + buildPermalink(data);
        }
    }

    return (
        <>
            <MetaTitle/>
            <MetaDescription/>
            <MetaKeywords/>
            <Head>
                {pageData?.slug && <link rel="canonical" href={pageUrl(pageData)}/>}
                <meta property="og:site_name" content={siteSettings?.siteTitle || 'Sanity Vital'} />
                { pageData?.slug && <meta property="og:url" content={pageUrl(pageData)} />}
                { pageData?.title && <meta property="og:title" content={pageData.title} />}
                { description && <meta property="og:description" content={description} />}
                <meta property="og:type" content={pageData?._type === 'post' ? 'article' : 'website'} />
                { imageUrl && <meta property="og:image" content={urlFor(imageUrl).width(750).url()} />}
                { siteSettings?.twitterLink && <meta name="twitter:site" content={'@' + siteSettings.twitterLink.split("/").slice(-1)[0]} />}
                { pageData?.title && <meta name="twitter:title" content={pageData.title} />}
                { description && <meta name="twitter:description" content={description} />}
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
        </>
    )
}