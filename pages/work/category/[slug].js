import {getGlobalProps} from "../../../lib/main";
import Link from "next/link";
import workPost from "../../../lib/workPost";

export async function getStaticPaths() {
    const paths = await workPost.getCategoryPaths()
    return {
        paths,
        fallback: false,
    }
}


export async function getStaticProps({params}) {
    const globalProps = await getGlobalProps()
    const posts = await workPost.getCategoryPosts(params.slug)
    const category = await workPost.getCategory(params.slug)

    const pageData = {
        page: {
            title: `${workPost.title} ${category.title}`
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
                        <Link href={workPost.buildPermalink(post)}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}