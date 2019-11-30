import React from 'react'

const ProductionHistory  = (props) => (
  <div className="production">
  <div className='widget_title'>Production</div>
  <div className="historic">
      <div><h2>Today</h2></div>
      <div>
          <h1>
          {Number((props.whToday)/1000).toFixed(2)}
          </h1>
      </div>
      * Killowats
  </div>
  <div className="historic">
      <div><h2>Last 7 days</h2></div>
      <div>
          <h1>
          {Number((props.whLastSevenDays)/1000).toFixed(2)}
          </h1>
          * Killowatts
      </div>
  </div>
</div>
)
export default ProductionHistory;