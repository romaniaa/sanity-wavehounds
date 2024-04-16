import slugify from "slugify";
export default {
    name: 'project',
    type: 'document',
    title: 'Project',
    fields: [
        {
            title: 'Project Title',
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
            title: 'Publish Date',
            name: 'publishDate',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: Rule => Rule.required()
        },
        {
            title: 'Category',
            name: 'category',
            type: 'reference',
            to: [{type: 'project.category'}],
        },
        {
            title: 'Featured Photo',
            name: 'media',
            type: 'image',
            fields: [{type: 'text', name: 'alt', title: 'Alternative text'}],
        },
        // {
        //     title: 'Content',
        //     name: 'content',
        //     type: 'array',
        //     of: [
        //         {
        //             type: 'block'
        //         },
        //         {
        //             type: 'image',
        //             fields: [{type: 'text', name: 'alt', title: 'Alternative text'}]
        //         },
        //         {
        //             type: 'portableText'
        //         }
        //     ]
        // },
        {
            title: "Metadata",
            name: "metadata",
            type: "page.meta",
            options: {
                collapsible: true,
                collapsed: true
            }
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category.title',
            media: 'media'
        }
    }
}