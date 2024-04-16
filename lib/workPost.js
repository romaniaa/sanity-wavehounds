import {groq} from "next-sanity";
import {getClient} from "./sanity.server";
import {filterDataToSingleItem} from "./sanity";
import {buildBlockProjections} from "./sanity.data";

export const title = 'Projects'

export const path = 'projects'

export const buildPermalink = (post) => {
    return `/${path}/${post.slug.current}`
}

export const getPostQuery = () => {
    const projections = [
        `...`,
        `"category":category->`,
        `"media":{...media, "asset":media.asset->}`,
        `"content":content[]{${buildBlockProjections().join(',')}}`,
        `"indexPage":*[_type == "page" && slug.current == "${path}"][0]{_type, slug}`
    ]
    return groq`*[_type == "project" && slug.current == $slug]{${projections.join(',')}}`
}

export const getProps = async (slug, preview) => {
    const pageData = await getSingle(slug, preview)
    return {
        pageData
    }
}

export const getPaths = async () => {
    const posts = await getAll()
    return posts.map(post => buildPermalink(post))
}

export const getAll = async () => {
    const query = groq`*[_type == "project" && defined(slug.current)]`
    return await getClient().fetch(query)
}

export const getSingle = async (slug = null, preview = false) => {
    if (!slug) return null
    const query = groq`*[_type == "project" && slug.current == $slug]{
        ...,
        "category":category->,
        "media":{"asset":media.asset->},
        "content": content[] {
            ...,
            ...select(
                _type == "image" => {
                    ...,
                    "asset": asset->
                } 
            )
        }
    }`
    const queryParams = {slug: slug}
    const data = await getClient(preview).fetch(query, queryParams)
    if (!data || data.length === 0) return null
    const page = filterDataToSingleItem(data, preview)
    return {
        page,
        query,
        queryParams
    }
}

export const getCategory = async (categorySlug) => {
    if (!categorySlug) return null
    const query = groq`*[_type == "project.category" && slug.current == "${categorySlug}"][0]`
    return await getClient().fetch(query)
}

export const getCategoryPosts = async (categorySlug) => {
    if (!categorySlug) return null
    const query = groq`*[_type == "project" && references(*[_type == "project.category" && slug.current == "${categorySlug}"]._id)]`
    return await getClient().fetch(query)
}

export const getCategories = async () => {
    const query = groq`*[_type == "project.category" && defined(slug.current)]`
    return await getClient().fetch(query)
}

export const buildCategoryPermalink = (category) => {
    return `/${path}/category/${category.slug.current}`
}

export const getCategoryPaths = async () => {
    const categories = await getCategories()
    return categories.map(category => buildCategoryPermalink(category))
}

export default {
    title,
    path,
    buildPermalink,
    getProps,
    getPaths,
    getAll,
    getSingle,
    getCategories,
    getCategoryPaths,
    getCategoryPosts,
    buildCategoryPermalink,
    getCategory
}