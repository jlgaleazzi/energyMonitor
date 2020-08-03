import React from "react";

const SubWidget = (props) => {
  let { title, watts } = { ...props };
  let kwToday = Number(watts / 1000).toFixed(2);
  return (
    <div className="sub-widget">
      <div className="sub-widget-title">{title}</div>
      &nbsp;&nbsp;{kwToday}
    </div>
  );
};

export default SubWidget;
