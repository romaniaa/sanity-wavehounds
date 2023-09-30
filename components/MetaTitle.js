import Head from "next/head";

export default function MetaTitle({pageTitle, siteTitle}) {
    const title = `${pageTitle || "Untitled Page"} - ${siteTitle || "Wavehounds x Sanity"}`
    return (
        <Head>
            <title>{title}</title>
        </Head>
    )
}