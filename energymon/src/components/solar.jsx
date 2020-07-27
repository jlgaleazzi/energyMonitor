import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import * as types from "../redux/actions/actionTypes";
import propTypes from "prop-types";
import Gauge from "./gauge";
const Solar = () => {
  const socketURL = `ws://${window.location.hostname}:5431`;
  const dispatch = useDispatch();
  const [solarEnergy, setSolarEnergy] = useState({
    wNow: 0,
    whLastSevenDays: 0,
    whToday: 0,
  });
  const [solarMax, setSolarMax] = useState(3.7);
  const solarSocket = new WebSocket(`${socketURL}/solar`);
  useEffect(() => {
    solarSocket.addEventListener("open", () => {
      solarSocket.send("ProducePanel Connected");
    });
    solarSocket.addEventListener("message", (e) => {
      const solarData = JSON.parse(e.data);
      let solar = solarData.production[1];
      dispatch({ type: types.GET_SOLAR_SUCCESS, solar });
    });
  }, []);

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
function mapStateToProps(state) {
  return {
    solar: state.solar,
  };
}

Solar.propTypes = {
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Solar);
