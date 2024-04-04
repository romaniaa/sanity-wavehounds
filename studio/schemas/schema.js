// First, we must import the schema creator
// import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
// import schemaTypes from 'all:part:@sanity/base/schema-type'

import page from "./page";
import post from "./post"
import siteSettings from "./siteSettings";
import menuLink from "./menuLink";
import menu from "./menu";
import postCategory from "./postCategory";
import portableText from "./portableText";
import pageMeta from "./pageMeta";
import accordion from './accordion';
import accordions from './accordions';
import button from './button';
import columnImages from './columnImages';
import content from './content';
import photoPlusText from './photoPlusText';
import link from './link';
import latestProjects from "./latestProjects";

// Then we give our schema to the builder and provide the result to Sanity
// export default ({
//     // We name our schema
//     name: 'default',
//     // Then proceed to concatenate our document type
//     // to the ones provided by any plugins that are installed
//     types: schemaTypes.concat([
//         siteSettings,
//         page,
//         post,
//         postCategory,
//         menu,
//         menuLink,
//         customBlock,
//         pageMeta,
//         accordion,
//         accordions,
//         button,
//         columnImages,
//         content,
//         photoPlusText,
//         link
//     ]),
// })
export default [
    siteSettings,
    page,
    post,
    postCategory,
    portableText,
    menu,
    menuLink,
    pageMeta,
    accordion,
    accordions,
    button,
    columnImages,
    content,
    photoPlusText,
    link,
    latestProjects
]
