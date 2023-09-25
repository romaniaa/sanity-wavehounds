import imageUrlBuilder from '@sanity/image-url'
import {sanityClient} from "./sanity.client";

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source) => builder.image(source)

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 */
export const filterDataToSingleItem = (data, preview) => {
    if (!Array.isArray(data)) {
        return data
    }

    if (data.length === 1) {
        return data[0]
    }

    if (preview) {
        return data.find((item) => item._id.startsWith(`drafts.`)) || data[0]
    }

    return data[0]
}