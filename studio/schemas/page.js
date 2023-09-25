import slugify from "slugify";
import {DocumentIcon, ImageIcon} from '@sanity/icons'
import {PageSlugInput} from "../components/PageSlugInput";


export default {
    name: 'page',
    type: 'document',
    title: 'Page',
    groups: [
        {name: 'general', title: 'General', default: true},
        {name: 'media', title: 'Media'},
        {name: 'options', title: 'Options'},
    ],
    fields: [
        {
            title: 'Page Title',
            name: 'title',
            type: 'string',
            validation: Rule => [
                Rule.required(),
                Rule.max(70).warning('Shorter titles are usually better for SEO')
            ]
        },
        {
            title: 'URL Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                slugify: input => slugify(input, {lower: true, strict: true})
            },
            validation: Rule => Rule.required(),
            description: "Provide a unique URL for this page, or click Generate to create one using the Page Title",
            components: {
                input: PageSlugInput
            },
            group: 'general'
        },
        {
            title: 'Parent page',
            name: 'parent',
            type: 'reference',
            to: [{ type: 'page' }],
            // _weak: true, // enable if you don't want reference integrity checks
        },
        {
            title: 'Featured Photo',
            name: 'media',
            type: 'image',
            fields: [{type: 'text', name: 'alt', title: 'Alternative text'}],
        },
        {
            title: 'Content Blocks',
            name: 'blocks',
            type: 'array',
            of: [
                {type:'photoPlusText'},
                {type:'columnImages'},
                {type:'content'},
                {type:'button'},
                {type:'accordions'},
                {
                    type: 'image',
                    name: 'image',
                    title: 'Image',
                    icon: ImageIcon,
                    fieldsets: [
                        {name: 'meta', title: 'Details', options: { collapsible: true, collapsed: true}}
                    ],
                    fields: [
                        {type: 'string', name: 'caption', title: 'Image caption', fieldset: 'meta'},
                        {type: 'string', name: 'alt', title: 'Alternative text', fieldset: 'meta'}
                    ],
                    options: {
                        hotspot: true
                    },
                },
            ],
            group: 'general'
        },
        {
            title: "Metadata",
            name: "metadata",
            type: "page.meta",
            options: {
                collapsible: true,
                collapsed: true
            }
        }
    ]
}