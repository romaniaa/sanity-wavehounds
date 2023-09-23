import Head from "next/head";

export default function MetaDescription({description}) {

    if (description) {
        return (
            <Head>
                <meta name="description" content={description}/>
            </Head>
        )
    }
}