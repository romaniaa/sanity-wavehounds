import Head from "next/head";

export default function MetaTitle({pageTitle, siteTitle}) {
    const title = `${pageTitle || "Untitled Page"} - ${siteTitle || "Sanity Vital"}`
    return (
        <Head>
            <title>{title}</title>
        </Head>
    )
}