import {createContext, useContext, useRef} from "react";

const AppContext = createContext({})
export default function ContextWrapper({value, children}) {
    const ssr = typeof window === 'undefined'
    const header = useRef(null)

    return (
        <AppContext.Provider value={{pageProps: value, header, ssr}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}