import {LaunchIcon} from '@sanity/icons'
export default {
    name: 'button',
    type: 'object',
    title: 'Button',
    icon: LaunchIcon,
    fields: [
        {
            title: 'Button Label',
            name: 'label',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            type: 'reference',
            name: 'target',
            title: 'Page',
            to: [{ type: 'page' }, { type: 'post' }],
            description: 'Choose a page for this button',
            _weak: true, // enable if you don't want reference integrity checks
            hidden: ({ parent }) => parent?.custom,
            validation: Rule => Rule.custom((target, {parent}) => {
                if (!parent.custom && !target) {
                    return 'You must select a page'
                }
                return true
            })
        },
        {
            type: 'string',
            name: 'customUrl',
            title: 'Custom URL',
            description: 'Enter a custom URL for this button.',
            hidden: ({ parent }) => !parent?.custom,
            validation: Rule => Rule
                .custom((customUrl, {parent}) => {
                    if (parent.custom && !customUrl) {
                        return 'A custom URL is required'
                    }
                    return true
                })
                .uri({
                    allowRelative: true, // Allow relative links
                    scheme: ["https", "http", "mailto", "tel"], // Default is ["https", "http"]
                })
        },
        {
            title: 'Custom URL',
            name: 'custom',
            type: 'boolean',
            initialValue: false
        },
        {
            title: 'Button Style',
            name: 'style',
            type: 'string',
            options: {
                list: [
                    {title: 'Simple', value: 'simple'},
                    {title: 'Outlined', value: 'outlined'}
                ], // <-- predefined values
                layout: 'radio' // <-- defaults to 'dropdown'
            },
            initialValue: 'simple'
        }
    ],
    preview: {
        select: {
            label: 'label'
        },
        prepare({label}) {
            return {
                title: "Button",
                subtitle: label,
                media: LaunchIcon
            }
        }
    }
}