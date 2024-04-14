import {getGlobalProps} from "../../lib/main";
import Link from "next/link";
import newsPost from "../../lib/newsPost";

export async function getStaticProps() {
    const globalProps = await getGlobalProps()
    const posts = await newsPost.getAll()
    const pageData = {
        page: {
            title: newsPost.title
        }
    }
    return {
        props: {
            ...globalProps,
            pageData,
            posts
        }
    }
}

export default function Index({posts}) {
    return (
        <>
            <h1>{newsPost.title}</h1>
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