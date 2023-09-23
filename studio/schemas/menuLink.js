
export default {
    name: 'menu.link',
    type: 'object',
    title: 'Link',
    preview: {
        select: {
            title: 'title',
            targetTitle: 'target.title',
        },
        prepare: ({ title, targetTitle }) => ({
            title: title || targetTitle,
        }),
    },
    fields: [
        {
            type: 'reference',
            name: 'target',
            title: 'Page',
            to: [{ type: 'page' }, { type: 'post' }],
            description: 'Choose a page for this link or leave it empty to turn it into a heading.',
            _weak: true, // enable if you don't want reference integrity checks
            hidden: ({ parent }) => parent?.custom
        },
        {
            type: 'string',
            name: 'customUrl',
            title: 'Custom URL',
            description: 'Enter a custom URL for this link.',
            hidden: ({ parent }) => !parent?.custom,
            validation: Rule => Rule.custom((customUrl, {parent}) => {
                if (parent.custom && !customUrl) {
                    return 'A custom URL is required'
                }
                return true
            })
        },
        {
            title: 'Custom URL',
            name: 'custom',
            type: 'boolean',
            description: 'Enter a custom URL for this link instead of choosing a page.',
            initialValue: false
        },
        {
            type: 'string',
            name: 'title',
            title: 'Title',
            description: 'Enter a custom title for this link or leave it empty to use the selected page title.',
            validation: Rule => Rule.custom((title, {parent}) => {
                if (parent.custom && !title) {
                    return 'A title is required when using a custom URL'
                }
                if (!parent.custom && !title && !parent.target) {
                    return 'A title is required when no page has been chosen'
                }
                return true
            })
        },
        {
            type: 'array',
            name: 'children',
            title: 'Sub Links',
            description: 'Add more links under this menu.',
            of: [
                { type: 'menu.link' }
            ],
        },
    ],
}