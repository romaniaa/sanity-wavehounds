import React from "react";
import {ImagesIcon} from '@sanity/icons'
import ColumnImagesPreview from "../components/ColumnImagesPreview"

export default {
    name: 'columnImages',
    type: 'document',
    title: 'Image Columns',
    icon: ImagesIcon,
    fields: [
        {
            type: 'image',
            name: 'image_one',
            title: 'Left Image',
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
            validation: Rule => Rule.required()
        },
        {
            type: 'image',
            name: 'image_two',
            title: 'Right Image',
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
            validation: Rule => Rule.required()
        },
        {
            title: 'Wide Image',
            name: 'wide',
            type: 'string',
            options: {
                list: [
                    {title: 'Left', value: 'left'},
                    {title: 'Right', value: 'right'}
                ], // <-- predefined values
                layout: 'radio' // <-- defaults to 'dropdown'
            },
            initialValue: 'right'
        },
    ],
    preview: {
        select: {
            image_one: 'image_one.asset.url',
            image_two: 'image_two.asset.url',
            caption_one: 'image_one.caption',
            caption_two: 'image_two.caption',
            wide: 'wide'
        }
    },
    components: {
        preview: ColumnImagesPreview
    }
}