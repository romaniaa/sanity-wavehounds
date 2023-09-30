import Button from "../components/blocks/Button";
import TextContent from "../components/blocks/TextContent";
import PhotoPlusText from "../components/blocks/PhotoPlusText";
// import LatestNewsAndProjects from "../components/blocks/LatestNewsAndProjects";
import ColumnImages from "../components/blocks/ColumnImages";
import WhImage from "../components/blocks/WhImage";
import dynamic from "next/dynamic";

const linkProjection = `..., "target":{...(@.target->{_type, slug, "parent":{...(parent->{slug, "parent":{...(parent->{slug})}})}})}`

const columnImageProjections = [
    `...`,
    `"image_one": {...image_one, "asset":image_one.asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}`,
    `"image_two": {...image_two, "asset":image_two.asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}`
]

const basicTextProjections = [
    '...',
    `markDefs[]{..., _type == "link" => {${linkProjection}}}`,
    `_type == "image" => {...,"asset":asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}`,
    `_type == "button" => {${linkProjection}}`,
    `_type == "columnImages" => {${columnImageProjections.join(',')}}`
]

const blocks = {
    content: {
        component: TextContent,
        projections: [
            `...`,
            `"content":content[]{${basicTextProjections.join(',')}}`
        ]
    },
    button: {
        component: ({value}) => <div className={'container-wide my-16 laptop:my-24'}><Button value={value} className={'laptop:ml-1/2'}/></div>,
        projections: [
            `...`,
            linkProjection
        ]
    },
    // hero: {
    //     component: Hero,
    //     projections: [
    //         `...`,
    //         `"slides": slides[]{..., "media":{...media, "asset":media.asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}}`
    //     ]
    // },
    photoPlusText: {
        component: PhotoPlusText,
        projections: [
            `...`,
            `"photo":{...photo, "asset":photo.asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}`,
            `"text": text[] {${basicTextProjections.join(',')}}`,
            `"photoLink":{...photoLink, "target":{...(photoLink.target->{_type, slug, "parent":{...(parent->{slug, "parent":{...(parent->{slug})}})}})}}`
        ]
    },
    // latestNewsAndProjects: {
    //     component: LatestNewsAndProjects,
    //     queries: [
    //         {
    //             key: 'latest',
    //             query: `*[(_type == 'post' || _type == 'project') && defined(slug.current)][]{_id, _type, title, slug, "date":coalesce(publishDate, _createdAt), "media":{...media, "asset":media.asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}, "category":category->} | order(date desc)`
    //         }
    //     ]
    // },
    columnImages: {
        component: ColumnImages,
        projections: columnImageProjections
    },
    // newsIndex: {
    //     component: dynamic(() => import('../components/blocks/NewsIndex'), {
    //         loading: () => 'Loading...',
    //     }),
    //     projections: [
    //         `...`,
    //         `category->`
    //     ],
    //     queries: block => [
    //         {
    //             key: 'posts',
    //             query: !block.category
    //                 ? `*[_type == 'post' && defined(slug.current)][]{_id, _type, title, featured, featuredInCategory, publishDate, slug, "media":{...media, "asset":media.asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}, "category":category->} | order(publishDate desc)`
    //                 : `*[_type == 'post' && defined(slug.current) && references($category)][]{_id, _type, title, featured, featuredInCategory, publishDate, slug, "media":{...media, "asset":media.asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}, "category":category->} | order(publishDate desc)`,
    //             params: !block.category
    //                 ? {}
    //                 : {category: block.category?._id}
    //         },
    //         {
    //             key: 'categories',
    //             query: `*[_type == 'post.category' && defined(slug.current)][]{_id, title, slug}`
    //         }
    //     ]
    // },
    // projectIndex: {
    //     component: dynamic(() => import('../components/blocks/ProjectIndex'), {
    //         loading: () => 'Loading...',
    //     }),
    //     projections: [
    //         `...`,
    //         `category->`
    //     ],
    //     queries: block => [
    //         {
    //             key: 'projects',
    //             query: !block.category
    //                 ? `*[_type == 'project' && defined(slug.current)][]{_id, _type, title, featured, featuredInCategory, location, slug, publishDate, "media":{...media, "asset":media.asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}, "category":category->} | order(publishDate desc)`
    //                 : `*[_type == 'project' && defined(slug.current) && references($category)][]{_id, _type, title, featured, featuredInCategory, location, slug, publishDate, "media":{...media, "asset":media.asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}, "category":category->} | order(publishDate desc)`,
    //             params: !block.category
    //                 ? {}
    //                 : {category: block.category?._id}
    //         },
    //         {
    //             key: 'categories',
    //             query: `*[_type == 'project.category' && defined(slug.current)][]{_id, title, slug, orderRank} | order(orderRank asc)`
    //         }
    //     ]
    // },
    // peopleIndex: {
    //     component: dynamic(() => import('../components/blocks/PeopleIndex'), {
    //         loading: () => 'Loading...',
    //     }),
    //     projections: [
    //         `...`,
    //         `category->`
    //     ],
    //     queries: block => [
    //         {
    //             key: 'people',
    //             query: !block.category
    //                 ? `*[_type == 'person' && defined(slug.current)][]{_id, _type, title, "fname":name, lname, slug, "media":{...portrait, "asset":portrait.asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}, "category":category->, "hasBio":defined(content) && count(content) > 0} | order(lname asc)`
    //                 : `*[_type == 'person' && defined(slug.current) && references($category)][]{_id, _type, title, "fname":name, lname, slug, orderRank, "media":{...portrait, "asset":portrait.asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}}, "category":category->, "hasBio":defined(content) && count(content) > 0} | order(${block.order_by || 'lname'} asc)`,
    //             params: !block.category
    //                 ? {}
    //                 : {category: block.category?._id}
    //         },
    //         {
    //             key: 'categories',
    //             query: `*[_type == 'person.category' && defined(slug.current)][]{_id, title, slug}`
    //         }
    //     ]
    // },
    image: {
        component: ({value}) => <div className={'container-wide py-24 laptop:py-50'}><WhImage className={'w-full'} value={value} sizes={'(max-width: 1920px) 100vw, 1920px'} captionClass={'w-full laptop:w-5/12'} /></div>,
        projections: [
            `...`,
            `"asset":asset->{_id,path,url,"metadata":{"dimensions":metadata.dimensions, "lqip":metadata.lqip}}`
        ]
    },
    accordions: {
        component: dynamic(() => import('../components/blocks/Accordions'), {
            loading: () => 'Loading...',
        }),
    }
}

export default blocks