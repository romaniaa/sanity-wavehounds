const slugify = require('slugify')

export default {
    name: 'page',
    type: 'document',
    title: 'Page',
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
            validation: Rule => Rule.required()
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
            title: 'Content',
            name: 'content',
            type: 'array',
            of: [
                {
                    type: 'block'
                },
                {
                    type: 'image',
                    fields: [{type: 'text', name: 'alt', title: 'Alternative text'}]
                },
                {
                    type: 'customBlock'
                }
            ],
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