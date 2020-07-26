import React from "react";
import { connect } from "react-redux";

const Solar = () => {
  const [solarEnergy, setSolarEnergy] = useState(0);
  const [solarMax, setSolarMax] = useState(3.7);

  return (
    <div className="container">
      <Gauge
        title="Solar energy produced"
        value={solarEnergy}
        maxValue={solarMax}
      ></Gauge>
    </div>
  );
};
function mapStateToProps(state, ownProps) {
  return {
    solar: state.solar,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Solar);
