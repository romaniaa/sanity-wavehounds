export default {
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
      {
          title: 'Custom URL',
          name: 'custom',
          type: 'boolean',
          initialValue: false
      },
      {
          type: 'reference',
          name: 'target',
          title: 'Page',
          to: [{ type: 'page' }, { type: 'post' }],
          description: 'Choose a page for this link',
          _weak: true, // enable if you don't want reference integrity checks
          hidden: ({ parent }) => parent?.custom,
          validation: Rule => Rule.custom((target, {parent}) => {
              if (!parent.custom && !target) {
                  return 'You must select a page'
              }
              return true
          })
      },
      {
          type: 'string',
          name: 'customUrl',
          title: 'Custom URL',
          description: 'Enter a custom URL for this link.',
          hidden: ({ parent }) => !parent?.custom,
          validation: Rule => Rule
              .custom((customUrl, {parent}) => {
                  if (parent.custom && !customUrl) {
                      return 'A custom URL is required'
                  }
                  return true
              })
              .uri({
                  allowRelative: true, // Allow relative links
                  scheme: ["https", "http", "mailto", "tel"], // Default is ["https", "http"]
              })
      }
  ]
}