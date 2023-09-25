'use client'

import {definePreview} from 'next-sanity/preview'
import {config} from './sanity.config'

export const usePreview = definePreview({projectId: config.projectId, dataset: config.dataset})