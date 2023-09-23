const slugify = require('slugify')

export default {
    name: 'menu',
    type: 'document',
    title: 'Menu',
    fields: [
        {
            type: 'string',
            name: 'title',
            title: 'Title',
            validation: Rule => Rule.required()
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            validation: Rule => Rule.required(),
            options: {
                source: 'title',
                slugify: input => slugify(input, {lower: true, strict: true})
            }
        },
        {
            type: 'array',
            name: 'links',
            title: 'Links',
            of: [
                { type: 'menu.link' }
            ]
        },
    ],
}