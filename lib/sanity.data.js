import {groq} from "next-sanity";
import {sanityClient} from "./sanity.client";
import blocks from "./blocks";


export const buildBlockProjections = () => {
    const projections = [
        '...',
        `markDefs[]{..., _type == "link" => {..., "target":{...(@.target->{_type, slug, "parent":{...(parent->{slug, "parent":{...(parent->{slug})}})}})}}}`
    ]
    for (const block in blocks) {
        const blockProjections = blocks[block]?.projections
        if (blockProjections) {
            const projectionsList = (typeof blockProjections === 'function') ? blockProjections() : blockProjections
            projections.push(`_type == "${block}" => {${projectionsList.join(',')}}`)
        }
    }
    return projections
}

const pageProjections = [
    `...`,
    `"parent":{...(parent->{slug, title, "parent":{...(parent->{slug, title})}})}`,
    `"media":{...media, "asset":media.asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}`,
    `"blocks":blocks[]{${buildBlockProjections().join(',')}}`
]

export const pageQuery = groq`*[_type == "page" && slug.current == $slug]{${pageProjections.join(',')}}`

/**
 * Gets all pages in a tree structure with children
 */
export const getPagesTree = async () => {
    const query = groq`*[_type == "page" && defined(slug.current) && !defined(parent)][]{
        _id,
        'slug':slug.current,
        'children': *[_type=='page' && defined(slug.current) && parent._ref == ^._id][]{
           _id,
           'slug':slug.current,
           'children': *[_type=='page' && defined(slug.current) && parent._ref == ^._id][]{
               _id,
               'slug':slug.current,
           }
        }
    }`
    return await sanityClient.fetch(query)
}

/**
 * Gets site settings
 */
export const getSiteSettings = async () => {
    const settingsQuery = groq`*[_type == "siteSettings"][0]{
        ...,
        'logo':logo{...,"asset":asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}},
        'logoTransparent':logoTransparent{...,"asset":asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}},
        'homePage':homePage->slug.current
    }`
    const siteSettings = await sanityClient.fetch(settingsQuery)

    const socialQuery = groq`*[_type == "socialMedia"][0]{..., 'socialSharingImage':shareImage{...,"asset":asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}}`
    const socialMedia = await sanityClient.fetch(socialQuery)

    return {
        ...siteSettings,
        ...socialMedia
    }
}


export const getMainMenu = async () => {
    const query = groq`*[_type == 'menu' && slug.current == coalesce(*[_type == 'siteSettings'][0].mainMenu->slug.current, 'main-menu')][0]{
      links[]{
        _key, title, custom, customUrl, title, 
        target->{_id, _type, title, slug, "parent":{...(parent->{slug, "parent":{...(parent->{slug})}})}},
        children[]{
          _key, title, custom, customUrl, title, 
          target->{_id, _type, title, slug, "parent":{...(parent->{slug, "parent":{...(parent->{slug})}})}},
            children[]{
            _key, title, custom, customUrl, title, 
            target->{_id, _type, title, slug, "parent":{...(parent->{slug, "parent":{...(parent->{slug})}})}}
          }
        }
      }
    }`
    return await sanityClient.fetch(query)
}