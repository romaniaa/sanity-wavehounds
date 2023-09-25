// export default function resolveProductionUrl(doc) {
//   const previewSecret = import.meta.env.SANITY_STUDIO_PREVIEW_SECRET
//   const baseUrl = import.meta.env.SANITY_STUDIO_SITE_URL

//   const previewUrl = new URL(baseUrl)
//   console.log('huh')

//   previewUrl.pathname = `/api/preview`
//   previewUrl.searchParams.append(`secret`, previewSecret)
//   previewUrl.searchParams.append(`slug`, doc?.slug?.current ?? `/`)
//   previewUrl.searchParams.append(`type`, doc?._type)

//   return previewUrl.toString()
// }
const previewSecret = import.meta.env.SANITY_STUDIO_PREVIEW_SECRET

// Replace `remoteUrl` with your deployed Next.js site
const remoteUrl = import.meta.env.SANITY_STUDIO_SITE_URL
const localUrl = `http://localhost:3000`

export default function resolveProductionUrl(doc) {
    const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl

    const previewUrl = new URL(baseUrl)

    previewUrl.pathname = `/api/preview`
    previewUrl.searchParams.append(`secret`, previewSecret)
    previewUrl.searchParams.append(`slug`, doc?.slug?.current ?? `/`)
    return previewUrl.toString()
}