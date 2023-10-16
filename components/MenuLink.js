import Link from "next/link";
import {buildPermalink} from "../lib/main";
import MagneticButton from './MagneticButton';

export default function MenuLink({link, className}) {
    return (
        <>
            {(!link.custom && link.target) || (link.custom && link.customUrl)
                ? <Link className={`cursor-none ${className} `} href={!link.custom ? buildPermalink(link.target) : link.customUrl}>
                    <MagneticButton title={link.title || link.target.title}/>
                </Link>
                : <div>{link.title}</div>
            }
        </>
    )
}