import {groq} from "next-sanity";
import {getClient} from "./sanity.server";
import {filterDataToSingleItem} from "./sanity";

/**
 * Gets page data for a given page slug
 */
export const getPageData = async (slug = null, preview = false) => {
    if (!slug) return null
    const query = groq`*[_type == "page" && slug.current == $slug]{
        ...,
        "parent":{"slug":parent->slug.current, "title":parent->title},
        "grandparent":{"slug":parent->parent->slug.current, "title":parent->parent->title},
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


/**
 * Gets all pages in a tree structure with children
 */
export const getPagesTree = async () => {
    const query = groq`*[_type == "page" && defined(slug.current) && !defined(parent)][]{
        'slug':slug.current,
        'children': *[_type=='page' && defined(slug.current) && references(^._id)][]{
           'slug':slug.current,
           'children': *[_type=='page' && defined(slug.current) && references(^._id)][]{
                'slug':slug.current,
            }
        }
    }`
    return await getClient().fetch(query)
}

/**
 * Gets site settings
 */
export const getSiteSettings = async () => {
    const query = groq`*[_type == "siteSettings"][0]{
        ...,
        'homePage':homePage->slug.current
    }`

    return await getClient().fetch(query)
}

/**
 * Gets all menus
 */
export const getMenus = async () => {
    const query = groq`*[_type == 'menu' && defined(slug.current)][] {
          ...,
          links[]{
            ...,
            target->{_id, _type, title, slug, 'tree':{_id, _type, slug, 'parent':parent->{_id, _type, slug, 'parent':parent->{_id, _type, slug, 'parent':parent->{slug}}}}},
            children[]{
              ...,
              target->{_id, _type, title, slug, 'tree':{_id, _type, slug, 'parent':parent->{_id, _type, slug, 'parent':parent->{_id, _type, slug, 'parent':parent->{slug}}}}},
                children[]{
                ...,
                target->{_id, _type, title, slug, 'tree':{_id, _type, slug, 'parent':parent->{_id, _type, slug, 'parent':parent->{_id, _type, slug, 'parent':parent->{_id, _type, slug}}}}}
              }
            }
          }
      }`

    return await getClient().fetch(query)
}