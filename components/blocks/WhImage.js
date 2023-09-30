import {urlFor} from "../../lib/sanity";
import NextImage from "next/image";

export default function WhImage({value, sizes, fill, priority, className}) {

    if (!value.asset) return null

    const url = value.asset.url
    const alt = value.alt || ' '
    const width = value.asset.metadata.dimensions.width
    const height = value.asset.metadata.dimensions.height
    const blurUrl = value.asset.metadata.lqip

    const loader = ({ src, width, quality }) => {
        return urlFor(src).width(width).quality(quality || 75).auto('format').url()
    }

    const layoutProps = fill ? {fill} : {width, height}

    return (
        <NextImage loader={loader} src={url} alt={alt} placeholder={'blur'} blurDataURL={blurUrl} sizes={sizes || '100vw'} priority={priority} className={className} {...layoutProps} />
    )
}