import {getMainMenu, getPagesTree, getSiteSettings} from "./sanity.data";
import docTypes from "./docTypes";
import React, {useEffect, useRef, useState} from "react";
import {filterDataToSingleItem} from "./sanity";
import {sanityClient} from "./sanity.client";
import blocks from "./blocks"

export const getGlobalProps = async () => {
    // get the site settings first
    const siteSettings = await getSiteSettings()
    // get all the menus
    const mainMenu = await getMainMenu()
    return {
        siteSettings,
        mainMenu
    }
}


/**
 * Gets a list of all pages in a tree structure and builds a list of paths using the page slugs.
 * Supports top level links, child links, and grandchild links
 */
export const getStaticPagePaths = async () => {
    const pages = await getPagesTree()

    const paths = []
    pages.forEach(path => {
        const rootPath = path.slug
        paths.push([rootPath])
        path.children.forEach(child => {
            const childPath = child.slug
            paths.push([rootPath, childPath])
            child.children.forEach(grandchild => {
                paths.push([rootPath, childPath, grandchild.slug])
            })
        })
    })
    return paths.map((slugs) => `/${slugs.join('/')}`)
}

/**
 * Builds a permalink string when given a tree of links from a menu
 */
export const buildPermalink = (doc) => {

    if (doc._type && doc._type !== 'page') {
        return docTypes[doc._type].buildPermalink(doc)
    }
    const paths = [doc.slug.current]
    if (doc.parent?.slug) {
        paths.push(doc.parent.slug.current)
        if (doc.parent.parent?.slug) {
            paths.push(doc.parent.parent.slug.current)
        }
    }
    return `/${paths.reverse().join('/')}`
}

export function useDynamicImport(importPromise) {
    const [imported, setImported] = useState({})

    useEffect(() => {
        let cancelled = false
        const awaitImport = async () => {
            const result = await importPromise
            if (!cancelled && result && Object.keys(imported).length === 0) {
                setImported(() => result)
            }
        };
        awaitImport()
        return () => {
            cancelled = true
        };
    }, [importPromise, imported])

    return imported
}

export const preparePageData = async (data, preview = false) => {
    // the sanity query can return multiple objects of the same page (drafts, revisions)
    // so we use a helper function to reduce it down to what we need
    let prepared = filterDataToSingleItem(data, preview)

    // we need to run extra queries for nested content in certain blocks. they need to be run as separate queries
    // because trying to nest them within the main content fetching query was resulting in performance issues
    prepared.blocks = prepared.blocks && await Promise.all(prepared.blocks.map(async (block) => {
        const queries = (typeof blocks[block._type]?.queries === 'function') ? blocks[block._type]?.queries(block) : blocks[block._type]?.queries
        if (queries) {
            const blockData = {...block}
            for (const i in queries) {
                blockData[queries[i].key] = await sanityClient.fetch(queries[i].query, queries[i].params || {})
            }
            return blockData
        }
        return block
    })) || null
    return prepared
}

export const renderBlock = (block) => {
    const blockComponent = blocks[block._type]?.component
    if (blockComponent) {
        return React.createElement(blockComponent, {value: block})
    }
    return <>No block defined: {block._type}</>
}
export const useIntersectionObserver = ({ref = null, whenTrue = () => {}, whenFalse = () => {}, options = {}} = {}) => {
    const observer = useRef(null)
    useEffect(() => {
        const el = ref?.current
        if (el) {
            observer.current = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        whenTrue()
                    } else {
                        whenFalse()
                    }
                });
            }, options);
            //console.log('observing', el)
            observer.current.observe(el)
        }

        if (observer.current) {
            return () => {
                observer.current.disconnect()
                observer.current = null
            }
        }

    }, [ref, options, whenFalse, whenTrue])

    return observer
}

export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({ x: -400, y: -400 });

    useEffect(() => {
        if (window.mousePosition) setMousePosition(window.mousePosition);

        const mouseMoveHandler = (event) => {
            const { clientX, clientY } = event;
            const mousePosition = { x: clientX, y: clientY }
            window.mousePosition = mousePosition
            setMousePosition(mousePosition);
        };
        document.addEventListener("mousemove", mouseMoveHandler);

        return () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
        };
    }, []);

    return mousePosition;
}

export function useCursorType() {
    const [ cursorType, setCursorType ] = useState({isHover: false, isMenu: false})

    useEffect(() => {
        const mouseOverHandler = (event) => {

            const link = event.target.closest('a')
            const button = event.target.closest('button')
            const menu = event.target.closest('header nav')
            const orangeBlock = event.target.closest('.changes-background.bg-orange-brand')

            const isHover = (link !== null || button !== null)
            const isMenu = menu !== null
            const isOrangeBlock = orangeBlock !== null

            setCursorType({isHover, isMenu, isOrangeBlock})
        }

        document.addEventListener("mouseover", mouseOverHandler)
        document.addEventListener("mouseout", mouseOverHandler)

        return () => {
            document.removeEventListener("mouseover", mouseOverHandler)
            document.removeEventListener("mouseout", mouseOverHandler)
        }
    }, [])

    return cursorType;
}