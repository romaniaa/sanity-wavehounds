import '../styles/globals.css'
import Layout from "../components/Layout";
import ContextWrapper from "../components/ContextWrapper";

export default function App({Component, pageProps}) {

    return (
        <>
            <ContextWrapper value={pageProps}>
                <Layout {...pageProps}>
                    <Component  {...pageProps} />
                </Layout>
            </ContextWrapper>
        </>
    )
}