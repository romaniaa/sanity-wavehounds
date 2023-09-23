export default {
    title: 'Metadata',
    name: 'page.meta',
    type: 'object',
    fields: [
        {
            name: 'keywords',
            title: 'Keywords',
            type: 'string',
            validation: Rule => Rule.custom(keywords => {
                const count = keywords.split(' ').length
                if (count > 10) {
                    return 'Fewer keywords is usually better for SEO'
                }
                return true
            }).warning()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.max(160).warning('Descriptions under 160 characters are usually better for SEO')
        },
    ]
}