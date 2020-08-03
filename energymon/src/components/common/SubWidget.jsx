import React from "react";

const SubWidget = (props) => {
    let { title, wattsToday } = { ...props };
    let kwToday = Number(wattsToday / 1000).toFixed(2);
    return (
        <div className="sub-widget">
            <div className="sub-widget-title">{title}</div>
            {kwToday}
        </div>
    );
};

export default SubWidget;
