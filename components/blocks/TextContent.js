import {PortableText} from "@portabletext/react";
import WhlImage from "./WhImage";
import Button from "./Button";
import TwoImages from "./ColumnImages";
import WhlLink from "./WhLink";

export default function TextContent({value}) {

    const components = {
        types: {
            image: ({value}) => <div className={'py-24 laptop:py-50'}><WhlImage value={value} className={'w-full'} sizes={'(max-width: 1920px) 100vw, 1920px'} captionClass={'w-full laptop:w-5/12'} /></div>,
            button: ({value}) => <Button value={value} className={'laptop:ml-1/2'}/>,
            twoImages: ({value}) => <div className={'py-24 laptop:py-50'}><TwoImages value={value} /></div>
        },
        block: {
            h2: ({children}) => <h2 className={'laptop:mr-1/2 laptop:h-0 laptop:overflow-visible'}>{children}</h2>,
            normal: ({children}) => <p className={'laptop:ml-1/2'}>{children}</p>,
            blockquote: ({children}) =>
                <blockquote className={'text-2xl text-center laptop:text-[40px] laptop:leading-[48px] laptop:w-8/12 laptop:mx-auto py-50 laptop:py-75'}>{children}</blockquote>
        },
        marks: {
            link: ({value, children}) => <WhlLink value={value}>{children}</WhlLink>
        },
        list: {
            // Ex. 1: customizing common list types
            bullet: ({children}) => <ul className="laptop:ml-1/2 list-disc pl-25">{children}</ul>,
            number: ({children}) => <ol className="laptop:ml-1/2 list-decimal pl-25">{children}</ol>,
        },
    }

    return (
        <div className={`py-40 laptop:py-70`}>
            <div className={'container-wide space-y-24 laptop:[&>h2+p]:!mt-0 dark:text-white light:text-dark-blue'}>
                {value?.content && <PortableText value={value.content} components={components} />}
            </div>
        </div>
    )
}