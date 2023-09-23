import Link from "next/link";

export default function Breadcrumbs({page}) {

    const separator = (
        <span> / </span>
    )

    const BreadcrumbLink = function ({slug, title}) {
        return (
            <Link href={slug}>
                {title}
            </Link>
        )
    }

    return (
        <>
            <BreadcrumbLink slug={'/'} title={'Home'} />
            {separator}
            {page?.grandparent?.slug &&
                <>
                    <BreadcrumbLink slug={`/${page.grandparent.slug}`} title={page.grandparent.title} />
                    {separator}
                </>
            }
            {page?.parent?.slug &&
                <>
                    <BreadcrumbLink slug={`/${page.grandparent.slug ? page.grandparent.slug + '/' + page.parent.slug :  page.parent.slug}`} title={page.parent.title} />
                    {separator}
                </>
            }
            {page?.title}
        </>
    )
}