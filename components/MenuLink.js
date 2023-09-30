import Link from "next/link";
import {buildPermalink} from "../lib/main";

export default function MenuLink({link, className}) {
    return (
        <>
            {(!link.custom && link.target) || (link.custom && link.customUrl)
                ? <Link href={!link.custom ? buildPermalink(link.target) : link.customUrl} className={className}>
                    {link.title || link.target.title}
                </Link>
                : <div>{link.title}</div>
            }
        </>
    )
}