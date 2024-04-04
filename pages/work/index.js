import {getGlobalProps} from "../../lib/main";
import Link from "next/link";
import workPost from "../../lib/workPost";

export async function getStaticProps() {
    const globalProps = await getGlobalProps()
    const posts = await workPost.getAll()
    const pageData = {
        page: {
            title: workPost.title
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
            <h1>{workPost.title}</h1>
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