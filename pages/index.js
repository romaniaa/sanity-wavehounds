import {getStaticPageProps} from "../lib/vital"
import PageContent from "../components/PageContent";

export async function getStaticProps() {
    const props = await getStaticPageProps()
    return {
        props
    }
}

export default function Index({pageData}) {
    if (pageData?.page) {
        return (
            <PageContent page={pageData.page}/>
        )
    }

    return (
        <div>
            Home page fallback
        </div>
    )
}