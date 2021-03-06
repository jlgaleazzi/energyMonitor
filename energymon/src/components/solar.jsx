import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import propTypes from "prop-types";
import Gauge from "./gauge";
import { getSolarSuccess } from "../redux/actions/solarActions";
import SubWidget from "./common/SubWidget";
const Solar = (props) => {
  const socketURL = `ws://${window.location.hostname}:5431`;
  //const socketURL = `ws://miniserver.local:5431`;
  const dispatch = useDispatch();
  const [solarMax, setSolarMax] = useState(3.7);
  const solarSocket = new WebSocket(`${socketURL}/solar`);
  useEffect(() => {
    solarSocket.addEventListener("open", () => {
      solarSocket.send("ProducePanel Connected");
    });
    solarSocket.addEventListener("message", (e) => {
      const solarData = JSON.parse(e.data);
      let solar = solarData.production[1];
      dispatch(getSolarSuccess(solar));
    });
  }, []);

  return (
    <div>
      <Gauge
        className="gauge"
        value={props.solarwNow}
        maxValue={solarMax}
        title="Solar energy produced"
      />
      <div className="sub-widget-container">
        <SubWidget title="Kwh Today" watts={props.solarToday} />
        <SubWidget title="Kwh Last Week" watts={props.solarLastSeven} />
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    solarwNow: state.solar.solarwNow,
    solarToday: state.solar.solarWattsToday,
    solarLastSeven: state.solar.solarWhLastSevenDays,
  };
}

Solar.propTypes = {
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Solar);
