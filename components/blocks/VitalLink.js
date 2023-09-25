import {buildPermalink} from "../../lib/vital";
import Link from "next/link";
import React from "react";

export default function VitalLink({value, children}) {
    if (value.custom) {
        return <a href={value.customUrl} className={'underline'}>{children}</a>
    }
    const href = value.target?.slug ? buildPermalink(value.target) : '#'
    return <Link href={href} className={'underline'}>{children}</Link>
}