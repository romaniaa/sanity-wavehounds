import React from "react";
import PageTemplate from "./templates/PageTemplate";
import PostTemplate from "./templates/PostTemplate";

function PageContent({data}) {

    if (data?._type === 'page') {
        return <PageTemplate page={data}  />
    }
    if (data?._type === 'post') {
        return <PostTemplate post={data} />
    }
}

export default PageContent