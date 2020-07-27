import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import propTypes from "prop-types";
import Gauge from "./gauge";
import { getSolarSuccess } from "../redux/actions/solarActions";
const Solar = (props) => {
  //const socketURL = `ws://${window.location.hostname}:5431`;
  const socketURL = `ws://miniserver.local:5431`;
  const dispatch = useDispatch();
  const [solarwNow, setsolarWnow] = useState(props.solarwNow);
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
  }, [dispatch, solarSocket]);

  return (
    <Gauge
      title="Solar energy produced"
      value={props.solarwNow}
      maxValue={solarMax}
    />
  );
};
function mapStateToProps(state) {
  return {
    solarwNow: state.solar.solarwNow,
  };
}

Solar.propTypes = {
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Solar);
