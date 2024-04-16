import { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext({});
export default function ContextWrapper({ value, children }) {
  const ssr = typeof window === "undefined";
  const header = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsOpening(!isOpen);
  };

  return (
    <AppContext.Provider value={{ pageProps: value, header, ssr, isOpen, isOpening, toggleMenu, setIsOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
