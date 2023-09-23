import {getMenus, getPageData, getPagesTree, getSiteSettings} from "./sanity.data";
import docTypes from "./docTypes";

export const getGlobalProps = async () => {
    // get the site settings first
    const siteSettings = await getSiteSettings()
    // get all the menus
    const menus = await getMenus()
    return {
        siteSettings,
        menus
    }
}

/**
 * Gets all props that are required to render a page. If no slug is passed in, it checks if there is a home page set
 * in the site settings and uses that.
 * @param slug The slug for the page we want to load
 * @param preview Whether we want to preview a draft or load the published page
 */
export const getStaticPageProps = async (slug = null, preview = false) => {
    const {siteSettings, menus} = await getGlobalProps()
    // if no slug is provided, use the site setting for the home page if it's set
    const pageSlug = !slug && siteSettings.homePage ? siteSettings.homePage : slug
    // get the page content
    const pageData = await getPageData(pageSlug, preview)
    return {
        menus,
        pageData,
        siteSettings
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

    const paths = [doc.tree.slug.current]
    if (doc.tree.parent) {
        paths.push(doc.tree.parent.slug.current)
        if (doc.tree.parent.parent) {
            paths.push(doc.tree.parent.parent.slug.current)
        }
    }
    return `/${paths.reverse().join('/')}`
}