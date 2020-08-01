import React from 'react'

const SubWidget = (props) => {
    let title = props.title;
    return (
        <div className="sub-widget">
            <div className="sub-widget-title">{title}</div>
        </div>
    )
}

export default SubWidget;



