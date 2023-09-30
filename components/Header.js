import React, { useState } from 'react';
import Link from 'next/link';
import MenuLink from './MenuLink';
import { useAppContext } from './ContextWrapper';
import DarkModeToggle from './DarkMode';

export default function Header() {
  const { pageProps } = useAppContext();
  const { mainMenu } = pageProps;

  // State to track dark mode status
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== 'undefined' && window.localStorage.getItem('theme') === 'dark'
  );

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <header className={'w-full p-20flex items-center shrink-0 light:bg-white dark:bg-dark-blue'}>
      <div className={'mr-10'}>
        <Link href={'/'}>Logo</Link>
      </div>
      <nav>
        {/* top level links */}
        {mainMenu && mainMenu.links && (
          <ul className={'space-x-8 flex flex-row'}>
            {mainMenu.links.map((link) => (
              <li key={link._key}>
                <MenuLink link={link} className={'no-underline dark:text-white light:text-dark-blue'} />
                {/* there are no child links in this design */}
              </li>
            ))}
          </ul>
        )}
        {/* end top level links */}
      </nav>

      {/* Render the DarkModeToggle component */}
      <DarkModeToggle
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </header>
  );
}
