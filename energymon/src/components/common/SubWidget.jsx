import React from 'react'

const SubWidget = (props) => {
    let { title, solarToday } = { ...props };
    return (
        <div className="sub-widget">
            <div className="sub-widget-title">{title}</div>
            {solarToday}
        </div>
    )
}

export default SubWidget;



