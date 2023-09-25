import React from "react";
import {BlockContentIcon} from '@sanity/icons'
import ContentPreview from "../components/ContentPreview";

export default {
    name: 'content',
    type: 'document',
    title: 'Text Content',
    icon: BlockContentIcon,
    fields: [
        {
            title: 'Content',
            name: 'content',
            type: 'portableText',
            validation: Rule => Rule.required()
        },
        {
            title: 'Background color',
            name: 'background',
            type: 'string',
            options: {
                list: [
                    {title: 'None', value: 'white'},
                    {title: 'Black', value: 'black'},
                    {title: 'Teal', value: 'teal'},
                ], // <-- predefined values
                layout: 'radio' // <-- defaults to 'dropdown'
            },
            initialValue: 'white',
        },
    ],
    preview: {
        select: {
            content: 'content',
            background: 'background'
        },
        prepare({content, background}){
            return {
                content,
                background
            }
        },
    },
    components: {
        preview: ContentPreview
    }
}