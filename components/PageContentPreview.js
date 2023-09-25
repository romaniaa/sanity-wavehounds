'use client'

import {usePreview} from '../lib/sanity.preview'
import PageContent from "./PageContent";
import {preparePageData} from "../lib/vital";
import {useState} from "react";
import {useAppContext} from "./ContextWrapper";

export default function PageContentPreview({token, query, params, ui}) {

    const [pageData, setPageData] = useState(null)

    const data = usePreview(token, query, params)

    preparePageData(data, true).then((data) => {
        setPageData(data)
    })

    if (pageData) return <PageContent data={pageData} ui={ui} />

}