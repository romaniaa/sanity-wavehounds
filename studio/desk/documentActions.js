import defaultResolve, {PublishAction,} from 'part:@sanity/base/document-actions';
import SetSlugAndPublishAction from "./actions/setSlugAndPublish.js"


/// Publish Actions
export default function useDocumentActions(props) {

    const setSlugsFor = ['page', 'post', 'post.category']

    if (setSlugsFor.includes(props.type)) {
        return defaultResolve(props).map((Action) =>
            Action === PublishAction ? SetSlugAndPublishAction : Action
        )
    }

    return defaultResolve(props)
}