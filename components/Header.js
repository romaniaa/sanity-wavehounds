import React, { useState, useContext } from "react";
import Link from "next/link";
import MenuLink from "./MenuLink";
import AppContext, { useAppContext } from "./ContextWrapper";
import DarkModeToggle from "./DarkModeToggle";
import MenuBurger from "./MenuBurger";

export default function Header() {
    const { pageProps } = useAppContext();
    const { mainMenu } = pageProps;
    const app = useContext(AppContext);

    const { isOpen, isOpening, setIsOpen } = useAppContext();

    // State to track dark mode status
    const [isDarkMode, setIsDarkMode] = useState(
        typeof window !== "undefined" &&
            window.localStorage.getItem("theme") === "dark"
    );

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode((prevDarkMode) => !prevDarkMode);
    };

    // Function to close the menu
    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header
            className={
                "w-full p-20 flex items-center shrink-0 light:bg-white dark:bg-dark-blue"
            }
        >
            <MenuBurger />
            <div
                className={`
                ${isOpening ? "skew-x-0 delay-100" : "-skew-x-12"}
                ${isOpen ? "-translate-x-[420px]" : "translate-x-[420px]"}
                fixed w-[420px] -right-[420px] top-0 h-screen dark:bg-white light:bg-blue z-40 transition-all duration-300`}
            >
                <div className={"mr-10"}>
                    <Link href={"/"}>Logo</Link>
                </div>
                <nav>
                    {mainMenu && mainMenu.links && (
                        <ul className={"space-y-20 flex flex-col px-40 mt-90"}>
                            {mainMenu.links.map((link) => (
                                <li key={link._key}>
                                    {
                                        <MenuLink
                                            link={link}
                                            className={
                                                "no-underline dark:text-dark-blue light:text-white dark:hover:text-dark-blue light:hover:text-white heading-2 text-bold"
                                            }
                                            onClick={closeMenu} // Close the menu when a menu link is clicked
                                        />
                                    }
                                </li>
                            ))}
                        </ul>
                    )}
                </nav>
                <DarkModeToggle
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                />
            </div>
        </header>
    );
}
