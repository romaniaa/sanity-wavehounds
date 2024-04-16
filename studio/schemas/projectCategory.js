import slugify from "slugify";
import {TagIcon} from '@sanity/icons'
import {orderRankField} from "@sanity/orderable-document-list";
export default {
    name: 'project.category',
    type: 'document',
    title: 'Project Category',
    icon: TagIcon,
    fields: [
        orderRankField({ type: "project.category" }),
        {
            title: 'Category Title',
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required()
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
        }
    ]
}