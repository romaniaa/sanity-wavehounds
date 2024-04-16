import React from "react";
import Link from "next/link";
import { buildPermalink } from "../lib/main";
import MagneticButton from './MagneticButton';

export default function MenuLink({ link, className, onClick }) {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <>
            {(!link.custom && link.target) || (link.custom && link.customUrl) ? (
                <MagneticButton>
                    <Link className={`cursor-none ${className}`} href={!link.custom ? buildPermalink(link.target) : link.customUrl} onClick={handleClick}>
                        {link.title || link.target.title}
                    </Link>
                </MagneticButton>
            ) : (
                <div>
                    <MagneticButton onClick={handleClick}>
                        {link.title}
                    </MagneticButton>
                </div>
            )}
        </>
    );
}
