// import S from '@sanity/desk-tool/structure-builder'
import Iframe from 'sanity-plugin-iframe-pane'
import resolveProductionUrl from "./resolveProductionUrl";

export const defaultDocumentNode = (S, {schemaType}) => {
    const views = [S.view.form()]
    if (schemaType === 'page' || schemaType === 'post' ) {
        const preview = S.view
            .component(Iframe)
            .options({
                url: (document) => resolveProductionUrl(document)
            })
            .title('Preview')
        views.push(preview)
    }
    return S.document().views(views)
}

export const structure = (S, context) =>
    S.list()
        .title('Site')
        .items([
            S.listItem()
                .title('Settings')
                .child(
                    S.list()
                        // Sets a title for our new list
                        .title('Settings')
                        // Add items to the array
                        // Each will pull one of our new singletons
                        .items([
                            S.listItem()
                                .title('General')
                                .child(
                                    S.document()
                                        .schemaType('siteSettings')
                                        .documentId('siteSettings')
                                ),
                            S.listItem()
                                .title('Navigation')
                                .child(
                                    S.documentList()
                                        .title('Menus')
                                        .schemaType('menu')
                                        .filter('_type == $type')
                                        .params({ type: 'menu' })
                                ),

                        ])
                ),
            S.listItem()
                .title('Pages')
                .child(
                    S.documentList()
                        .title('Pages')
                        .schemaType('page')
                        .filter('_type == $type')
                        .params({ type: 'page' })
                ),
            S.listItem()
                .title('Work')
                .child(
                    S.list()
                        .title('Work')
                        .items([
                            S.listItem()
                                .title('Posts')
                                .child(
                                    S.documentList()
                                        .title('Posts')
                                        .schemaType('post')
                                        .filter('_type == $type')
                                        .params({ type: 'post' })
                                ),
                            S.listItem()
                                .title('Categories')
                                .child(
                                    S.documentList()
                                        .title('Categories')
                                        .schemaType('post.category')
                                        .filter('_type == $type')
                                        .params({ type: 'post.category' })
                                ),

                        ])

                ),
            // We also need to remove the new singletons from the main list
            //...S.documentTypeListItems().filter(listItem => !['siteSettings', 'page'].includes(listItem.getId()))
        ])