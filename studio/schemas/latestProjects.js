import {DashboardIcon} from '@sanity/icons'
export default {
    name: 'latestProjects',
    type: 'object',
    title: 'Projects Grid',
    icon: DashboardIcon,
    fields: [
        {
            title: "Heading",
            name: "heading",
            type: "string",
            description: "Give this section a heading"
        },
        {
            title: 'Per page',
            name: 'perPage',
            type: 'number',
            initialValue: 9,
            description: "How many to display on each page"
        }
    ],
    preview: {
        select: {
            heading: 'heading',
            perPage: 'perPage'
        },
        prepare({heading, perPage}) {
            return {
                title: heading ? heading : 'Projects Grid',
                subtitle: `Showing ${perPage} projects per page`,
                media: DashboardIcon
            }
        }
    }
}