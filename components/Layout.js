import Header from "./Header";
import Footer from "./Footer";
// import PreviewBar from "./PreviewBar";
import MetaTags from "./MetaTags";
import {useEffect} from "react";
// import {useAppContext} from "./ContextWrapper";
import Cursor from './Cursor'

export default function Layout({children, preview, pageData }) {

    return (
        <div className={`h-full flex flex-col`}>
            <MetaTags/>
            {/* <PreviewBar preview={preview} /> */}
            <Header/>
            <main className={`grow relative min-h-screen`}>
                {children}
            </main>
            <Footer/>
            <Cursor/>
        </div>
    )
}