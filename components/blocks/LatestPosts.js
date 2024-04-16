// import PostCard from "../PostCard";
import {useEffect, useRef, useState} from "react";
import {useDynamicImport} from "../../lib/main";
// import ProjectCard from "../ProjectCard";
import Button from "./Button";

export default function LatestProjects({value}) {
    const {latest, perPage, heading} = value
    const grid = useRef(null)
    const ssr = typeof window === 'undefined'

    const [page, setPage] = useState(1)

    const loadMore = () => {
        setPage(page + 1)
    }
console.log('value', value)
    return (
        <div className={'container-wide my-py laptop:my-py'}>
            {heading && <h2 className={'my-24 laptop:my-50'}>{heading}</h2>}
            
        </div>
    )
}