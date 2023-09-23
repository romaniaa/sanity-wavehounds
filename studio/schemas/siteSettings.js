export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    groups: [
        {
            name: 'metadata',
            title: 'Metadata',
            default: true
        },
        {
            name: 'general',
            title: 'General',
        },
    ],
    fields: [
        {
            name: 'title',
            title: 'Site Title',
            type: 'string',
            group: 'metadata'
        },
        {
            name: 'description',
            title: 'Site Description',
            type: 'text',
            group: 'metadata'
        },
        {
            type: 'reference',
            name: 'homePage',
            title: 'Home Page',
            to: [{ type: 'page' }],
            description: 'Select a page to use as your home page.',
            _weak: true, // enable if you don't want reference integrity checks
            group: 'general'
        }
    ]
}