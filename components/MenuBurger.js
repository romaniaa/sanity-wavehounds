import React, { useState, useContext } from 'react';
import { useAppContext } from './ContextWrapper';


export default function MenuBurger() {

  const { isOpen, toggleMenu } = useAppContext();

  return(
    <button
      className={`hamburger-menu rounded-full w-60 h-60 p-20 fixed right-20 top-20 tranition-all duration-300 z-50 ${isOpen ? 'bg-red' : 'bg-blue'}`}
      onClick={toggleMenu}
      >
      <div className={`w-full h-1 bg-white my-4 transition-transform transform ${isOpen ? 'rotate-45 -translate-x-0 translate-y-4' : ''}`}></div>
      <div className={`w-full h-1 bg-white my-4 ${isOpen ? 'opacity-0' : ''}`}></div>
      <div className={`w-full h-1 bg-white my-4 transition-transform transform ${isOpen ? '-rotate-45 -translate-x-0 -translate-y-6' : ''}`}></div>
    </button>
  )

}