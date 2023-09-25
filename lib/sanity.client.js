import {createClient} from 'next-sanity'
import {config} from './sanity.config'

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)