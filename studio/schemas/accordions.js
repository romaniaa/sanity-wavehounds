import {StackCompactIcon} from '@sanity/icons'
import React from "react";
import AccordionsPreview from "../components/AccordionsPreview";

export default {
    name: 'accordions',
    type: 'document',
    title: 'Accordions',
    icon: StackCompactIcon,
    fields: [
        {
            title: 'Heading',
            name: 'heading',
            type: 'string'
        },
        {
            title: 'Accordions',
            name: 'accordions',
            type: 'array',
            of: [
                {type:'accordion'}
            ]
        }
    ],
    preview: {
        select: {
            heading: 'heading',
            accordions: 'accordions'
        },
        prepare({heading, accordions}) {
            return {
                title: heading ? heading : 'Accordions',
                accordions
            }
        }
    },
    components: {
        preview: AccordionsPreview
    }
}