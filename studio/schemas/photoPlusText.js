import {InlineIcon} from '@sanity/icons'
import link from "./link";

export default {
    name: 'photoPlusText',
    type: 'document',
    title: 'Photo & Text Columns',
    icon: InlineIcon,
    fields: [
        {
            title: 'Photo',
            name: 'photo',
            type: 'image',
            fieldsets: [
                {name: 'meta', title: 'Details', options: { collapsible: true, collapsed: true}}
            ],
            fields: [
                {type: 'string', name: 'alt', title: 'Alternative text', fieldset: 'meta'}
            ],
            options: {
                hotspot: true
            }
        },
        {
            title: 'Photo link',
            type: 'link',
            name: 'photoLink',
            description: 'Clicking the photo will link to a page'
        },
        {
            title: 'Text',
            name: 'text',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        {title: 'Normal', value: 'normal'},
                        {title: 'Heading 2', value: 'h2'},
                        {title: 'Heading 3', value: 'h3'},
                    ],
                    marks: {
                        annotations: [
                            link
                        ]
                    }
                },
                {type: 'button', title: 'Button'},
            ]
        }
    ],
    preview: {
        select: {
            media: 'photo',
            text: 'text'
        },
        prepare({media, text}) {
            const excerpt = text?.find(t => t.style === 'normal')?.children[0]?.text
            return {
                media,
                title: 'Photo & Text Columns',
                subtitle: excerpt
            }
        }
    }
}