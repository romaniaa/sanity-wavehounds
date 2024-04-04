import WhImage from "../blocks/WhImage";
import {PortableText} from "@portabletext/react";
import React from "react";
import PostDate from "../PostDate";
import Button from "../blocks/Button";
import WhLink from "../blocks/WhLink";

export default function PostTemplate({post}) {

    const components = {
        types: {
            image: ({value}) => <WhImage value={value} className={'w-full'} />,
        },
        marks: {
            link: ({value, children}) => <WhLink value={value}>{children}</WhLink>
        }
    }

    const postContent = (
        <div className="space-y-24 inverted:text-white">
            {post?.publishDate && <PostDate date={post.publishDate} className={'block text-grey-brand'} />}
            {post?.content && <PortableText value={post.content} components={components} />}
            {post?.indexPage && <Button value={{ style: 'outlined', target:post.indexPage, label: 'Back to All Work' }} />}
        </div>
    )

    return (
        <>
            <div className={'mt-80 laptop:mt-100 container-wide inverted:text-white'}>
                {post?.title && <h1 className={'w-full py-12 laptop:py-24'}>{post.title}</h1>}
            </div>

            {/* 2-col layout when there is a photo set */}
            {post?.media?.asset &&
                <div className={'flex flex-col laptop:flex-row container-wide'}>
                    <div className={'w-full laptop:w-1/2'}>
                        <WhImage value={post.media} sizes={'(max-width: 1024px) 100vw, (max-width: 1920px) 50vw, 910px'} className={'w-full'} priority={true} captionClass={'w-full laptop:w-10/12'} />
                    </div>
                    <div className={'w-full laptop:w-1/2 laptop:pl-24 mt-24 laptop:mt-0'}>
                        {postContent}
                    </div>
                </div>
            }

            {/* layout without a photo */}
            {!post?.media?.asset &&
                <div className={'container-wide'}>
                    {postContent}
                </div>
            }
        </>
    )
}