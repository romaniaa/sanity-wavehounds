const slugify = require('slugify')

export default {
    name: 'post.category',
    type: 'document',
    title: 'Post Category',
    groups: [
        {
            name: 'general',
            title: 'General',
            default: true
        },
        {
            name: 'seo',
            title: 'SEO',
        },
    ],
    fields: [
        {
            title: 'Category Title',
            name: 'title',
            type: 'string',
            group: 'general',
            validation: Rule => Rule.required()
        },
        {
            title: 'URL Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                slugify: input => slugify(input, {lower: true, strict: true})
            },
            group: 'seo',
            validation: Rule => Rule.required()
        }
    ]
}