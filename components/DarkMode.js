import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  // Dark mode and toggle
  const storedTheme = typeof window !== 'undefined' && window.localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedTheme || 'light');
  const [checked, setChecked] = useState(storedTheme === 'light' ? true : false);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === 'light' ? 'dark' : 'light';
    });
    setChecked((prevChecked) => !prevChecked);
  };

  // Dark mode
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  // CSS transitions
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <label className="toggle-switch absolute inline-block w-35 h-20 z-[99] right-50 top-20">
        <input defaultChecked={checked} type="checkbox" onChange={toggleTheme}/>
        <span className="switch absolute cursor-pointer bg-dark-blue rounded-full top-0 bottom-0 right-0 left-0  transition-all duration-300" />
      </label>
    </div>
  );
};

export default DarkModeToggle;
