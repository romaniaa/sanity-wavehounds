import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import schemas from './schemas/schema'
import {structure, defaultDocumentNode} from './desk/structure'
import resolveProductionUrl from "./desk/resolveProductionUrl";
import FullRebuild from "./desk/actions/fullRebuild";

const limitedActions = [
    'siteSettings',
    'socialMedia'
]

const allowCreate = [
    'page'
]

export default defineConfig({
    title: 'WaveHounds',
    projectId: 'fsxpq9nv',
    dataset: import.meta.env.DEV ? 'dev' : 'production',
    plugins: [
        deskTool({structure, defaultDocumentNode}),
        visionTool({})
    ],
    tools: (prev) => {
        // 👇 Uses environment variables set by Vite in development mode
        if (import.meta.env.DEV) {
            return prev
        }
        return prev.filter((tool) => tool.name !== 'vision')
    },
    schema: {
        types: schemas,
    },
    document: {
        productionUrl: async (prev, context) => {
            const {client, dataset, document} = context
            return resolveProductionUrl(document)
        },
        newDocumentOptions: (prev, { creationContext }) => {
            if (creationContext.type === 'global') {
                return prev.filter((templateItem) => allowCreate.includes(templateItem.templateId)  )
            }
            return prev
        },
        actions: (prev, { schemaType }) => {
            if (limitedActions.includes(schemaType)) {
                return prev.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action))
            }
            return import.meta.env.DEV ? prev : [...prev, FullRebuild]
        },
    },
})