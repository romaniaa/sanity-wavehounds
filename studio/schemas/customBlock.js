import React from "react";

class Preview extends React.Component {
    render() {
        const {value} = this.props
        return (
            <div>
                <h1>{value.title}</h1>
                <img src={value.imageUrl} style={{width: '100%', maxWidth: '100%'}} alt={value.altText}/>
            </div>
        )
    }
}

export default {
    name: 'customBlock',
    type: 'document',
    title: 'Custom Block',
    fields: [
        {
            type: 'string',
            name: 'title',
            title: 'Title',
            validation: Rule => Rule.required()
        },
        {
            type: 'image',
            name: 'image',
            title: 'Photo',
            fields: [{type: 'text', name: 'alt', title: 'Alternative text'}]
        },
    ]
}
