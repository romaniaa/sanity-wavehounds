import Head from "next/head";
import {useAppContext} from "./ContextWrapper";

export default function MetaKeywords() {
    const {pageProps} = useAppContext()
    const pageData = pageProps.pageData

    if (pageData?.metadata?.keywords) {
        return (
            <Head>
                <meta name="keywords" content={pageData?.metadata?.keywords}/>
            </Head>
        )
    }
}