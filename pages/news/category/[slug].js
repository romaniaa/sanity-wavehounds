import {getGlobalProps} from "../../../lib/main";
import Link from "next/link";
import newsPost from "../../../lib/newsPost";

export async function getStaticPaths() {
    const paths = await newsPost.getCategoryPaths()
    return {
        paths,
        fallback: false,
    }
}


export async function getStaticProps({params}) {
    const globalProps = await getGlobalProps()
    const posts = await newsPost.getCategoryPosts(params.slug)
    const category = await newsPost.getCategory(params.slug)

    const pageData = {
        page: {
            title: `${newsPost.title} ${category.title}`
        }
    }
    return {
        props: {
            ...globalProps,
            pageData,
            posts,
            category
        }
    }
}

export default function Index({posts, category}) {
    return (
        <>
            <h1>
                {category.title}
            </h1>
            <ul>
                {posts && posts.map(post => (
                    <li key={post._id}>
                        <Link href={newsPost.buildPermalink(post)}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}