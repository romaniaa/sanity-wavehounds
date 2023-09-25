import VitalImage from "../blocks/VitalImage";
import React, {useRef} from "react";
import {useIntersectionObserver} from "../../lib/vital";
import PageBlocks from "../PageBlocks";
import {useAppContext} from "../ContextWrapper";

export default function PageTemplate({page}) {

    const hero = useRef(null)
    const {header} = useAppContext()

    useIntersectionObserver({
        ref: hero,
        whenTrue: () => {
            header.current.classList.add('transparent')
        },
        whenFalse: () => {
            header.current.classList.remove('transparent')
        },
        options: {threshold: .85}
    })

    return (
        <div>
             {/*show the featured image hero on pages that have an image set*/}
            {page?.media?.asset && !page.hideTitle &&
                <div className={'w-full h-screen max-h-[100svh] relative'} ref={hero}>
                    <VitalImage value={page.media} sizes={'100vw'} fill className={'object-cover'} priority={true} />
                    <div className={'absolute w-full h-full bg-black/15'}></div>
                    <div className="flex flex-col justify-end absolute w-full h-full pb-24">
                        {page?.title && <h1 className={'container-wide text-white'}>{page.title}</h1>}
                    </div>
                </div>
            }

            {/* show the basic page title on pages with no featured image */}
            {!page?.media?.asset && !page.hideTitle &&
                <div className={'mt-80 laptop:mt-100 container-wide inverted:text-white transition-colors'}>
                    {page?.title && <h1 className={'py-16 laptop:py-24'}>{page.title}</h1>}
                </div>
            }

            <PageBlocks blocks={page?.blocks} />

        </div>
    )
}