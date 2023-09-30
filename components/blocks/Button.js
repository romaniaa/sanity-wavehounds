import {buildPermalink} from "../../lib/main";
import Link from "next/link";
import React from "react";

export default function Button({value, onClick, children, style = 'simple', className = ''}) {

    const styles = [
        {
            name: 'simple',
            classList: 'inline-block underline underline-offset-[6px] decoration-orange-brand decoration-2 text-current hover:text-current hover:decoration-black inverted:hover:decoration-white transition-colors'
        },
        {
            name: 'outlined',
            classList: 
                `text-current relative inline-flex items-center justify-center text-current border border-current overflow-hidden transition-colors px-35 py-10 body-1 text-center self-start hover:text-black hover:border-black hover:opacity-100
                inverted:hover:text-white inverted:hover:border-white
                inverted-orange:hover:border-black inverted-orange:hover:text-black inverted-orange:before:bg-white
                before:transition-[width] before:content-[""] before:w-0 before:h-full before:bg-orange-brand before:absolute before:top-0 before:left-0 before:-z-10 hover:before:w-full`
        },
    ]

    const styleName = value?.style || style
    const classList = styles.find(style => style.name === styleName).classList

    if (onClick) {
        return <button className={`${classList} ${className}`} onClick={onClick}>{children}</button>
    } else if (value.custom) {
        return <a href={value.customUrl || ''} className={`${classList} ${className}`}>{value.label || ''}</a>
    } else {
        const href = value.target?.slug ? buildPermalink(value.target) : '#'
        return <Link href={href} className={`${classList} ${className}`}>{value.label || ''}</Link>
    }
}