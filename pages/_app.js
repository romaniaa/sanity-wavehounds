import '../styles/globals.css'
import Layout from "../components/Layout";
import ContextWrapper from "../components/ContextWrapper";
import ComingSoon from '../components/ComingSoon';

export default function App({Component, pageProps}) {

    return (
        <>
            <ContextWrapper value={pageProps}>
                <ComingSoon/>
                {/* <Layout {...pageProps}>
                    <Component  {...pageProps} />
                </Layout> */}
            </ContextWrapper>
        </>
    )
}