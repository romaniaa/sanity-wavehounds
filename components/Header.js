import Link from "next/link";
import MenuLink from "./MenuLink";

export default function Header({menu}) {
    return (
        <header className={'w-full bg-gray-200 h-16 flex items-center shrink-0'}>
            <div className={'mr-10'}>
                <Link href={'/'}>Logo</Link>
            </div>
            <nav>
                {/*top level links*/}
                {menu && menu.links &&
                    <ul className={'flex items-center space-x-5'}>
                        {menu.links.map(link => (
                            <li key={link._key} className={'group relative'}>
                                <MenuLink link={link} />

                                {/*child links*/}
                                {link.children &&
                                    <ul className={'hidden group-hover:block absolute top-5 bg-gray-200 left-0 p-4 w-44'}>
                                        {link.children.map(child => (
                                            <li key={child._key}>
                                                <MenuLink link={child} />

                                                {/*grandchild links*/}
                                                {child.children &&
                                                    <ul className={'ml-5'}>
                                                        {child.children.map(grandchild => (
                                                            <li key={grandchild._key}>
                                                                <MenuLink link={grandchild} />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                }
                                                {/*end grandchild links*/}

                                            </li>
                                        ))}
                                    </ul>
                                }
                                {/*end child links*/}
                            </li>
                        ))}
                    </ul>
                }

                {/*end top level links*/}
            </nav>
        </header>
    )
}