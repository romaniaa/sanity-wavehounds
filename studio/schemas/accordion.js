import {StackIcon} from '@sanity/icons'
export default {
    name: 'accordion',
    type: 'object',
    title: 'Accordion',
    icon: StackIcon,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: 'Start Open',
            name: 'startOpen',
            type: 'boolean',
            initialValue: false
        },
        {
            title: 'Text',
            name: 'text',
            type: 'array',
            of: [
                {type: 'block'},
                {type: 'button', title: 'Button'},
            ],
            validation: Rule => Rule.required()
        }
    ],
    preview: {
        select: {
            title: 'title'
        },
        prepare({title}) {
            return {
                title: title ? title : 'Accordion',
                media: StackIcon
            }
        }
    }
}