// import PostCard from "../PostCard";
import {useEffect, useRef, useState} from "react";
import {useDynamicImport} from "../../lib/main";
// import ProjectCard from "../ProjectCard";
import Button from "./Button";

export default function LatestProjects({value}) {
    const {latest, perPage, heading} = value
    const grid = useRef(null)
    const ssr = typeof window === 'undefined'
    console.log(value)

    const [page, setPage] = useState(1)

    const loadMore = () => {
        setPage(page + 1)
    }

    return (
        <div className={'container-wide my-py laptop:my-py'}>
            {heading && <h2 className={'my-24 laptop:my-50'}>{heading}</h2>}
            <div ref={grid} className={'-mx-8 laptop:-mx-12 relative'}>
                {/* empty item required for masonry to measure the width of grid items when percents are used */}
                <div className={'grid-sizer w-1/2 laptop:w-1/3'}></div>

                {/* {latest && latest.map((item, i) => {
                    if (i+1 <= page * perPage) {
                        return (
                            <div key={item._id} className={`grid-item w-1/2 laptop:w-1/3 mb-24 laptop:mb-30 px-8 laptop:px-12`}>
                                {item._type === 'post' &&
                                    <PostCard post={item} label={'News'} imageSizes={'(max-width: 1024px) 50vw, (max-width: 1920px) 33vw, 590px'} />
                                }
                                {item._type === 'project' &&
                                    <ProjectCard project={item} label={'Project'} imageSizes={'(max-width: 1024px) 50vw, (max-width: 1920px) 33vw, 590px'} />
                                }
                            </div>
                        )
                    }
                })} */}
            </div>
            {latest && page * perPage <= latest.length &&
                <div className={'my-16 laptop:my-24 flex items-center justify-center'}>
                    <Button onClick={loadMore} style={'outlined'}>View More</Button>
                </div>
            }
        </div>
    )
}