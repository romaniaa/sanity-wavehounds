import {renderBlock} from "../lib/vital";
import {useAppContext} from "./ContextWrapper";

export default function PageBlocks({blocks}) {
    const {pageProps} = useAppContext()
    const pageData = pageProps.pageData
    return (
        <>
            {blocks && blocks.map((block, i) => (
                <section key={i} className={`inverted:text-white transition-colors ${pageData?._type === 'project' ? 'first-of-type:laptop:min-h-[400px]' : ''} ${block._type !== 'hero' ? 'first:mt-80 laptop:first:mt-100' : ''}`}>
                    {renderBlock(block, i)}
                </section>
            ))}
        </>
    )
}