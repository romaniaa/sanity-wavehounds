import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  // Dark mode and toggle
  const storedTheme = typeof window !== 'undefined' && window.localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedTheme || 'light');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === 'light' ? 'dark' : 'light';
    });
  };

  // Dark mode
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  // Set the checked state based on the theme
  const isChecked = theme === 'dark';

  return (
    <div>
      <label className="cursor-text--toggle_color toggle-switch absolute inline-block w-35 h-20 z-[99] right-50 bottom-20">
        <input checked={isChecked} type="checkbox" onChange={toggleTheme}/>
        <span className="switch absolute cursor-none bg-dark-blue rounded-full top-0 bottom-0 right-0 left-0  transition-all duration-300" />
      </label>
    </div>
  );
};

export default DarkModeToggle;
