import {ImageIcon} from "@sanity/icons";
import link from "./link";

export default {
    title: 'Portable Text',
    name: 'portableText',
    type: 'array',
    of: [
        {
            type: 'block',
            styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'Heading 2', value: 'h2'},
                {title: 'Heading 3', value: 'h3'},
                {title: 'Heading 4', value: 'h4'},
                {title: 'Heading 5', value: 'h5'},
                {title: 'Heading 6', value: 'h6'},
                {title: 'Quote', value: 'blockquote'},
            ],
            marks: {
                annotations: [
                    link
                ]
            }
        },
        {
            type: 'image',
            title: "Image",
            icon: ImageIcon,
            fieldsets: [
                {name: 'meta', title: 'Details', options: { collapsible: true, collapsed: true}}
            ],
            fields: [
                {type: 'string', name: 'caption', title: 'Image caption', fieldset: 'meta'},
                {type: 'string', name: 'alt', title: 'Alternative text', fieldset: 'meta'}
            ],
            options: {
                hotspot: true
            },
        },
        {
            type: 'button',
            title: 'Button'
        },
        {
            type: 'columnImages'
        }
    ]
}