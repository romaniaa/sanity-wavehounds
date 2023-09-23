import VitalImage from "./blocks/VitalImage";
import CustomBlock from "./blocks/CustomBlock";
import {PortableText} from "@portabletext/react";

export default function PageContent({page}) {
    const components = {
        types: {
            image: VitalImage,
            customBlock: CustomBlock
        }
    }
    return (
        <>
            {page?.content && <PortableText value={page.content} components={components}/>}
        </>
    )
}