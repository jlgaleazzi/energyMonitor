import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getConsumedSuccess } from "../redux/actions/consumedActions";
import propTypes from "prop-types";
import Gauge from "./gauge";

const Consumed = (props) => {
  const socketURL = `ws://${window.location.hostname}:5431`;
  //const socketURL = `ws://miniserver.local:5431`;
  const dispatch = useDispatch();
  const consumedSocket = new WebSocket(`${socketURL}/ccout`);
  const [time, setTime] = useState("00:00");
  const formatTime = () => {
    var d = new Date();
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  useEffect(() => {
    consumedSocket.addEventListener("open", () => {
      consumedSocket.send("ConsumedPanel Connected");
    });
    consumedSocket.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);
      let info = data;
      setTime(formatTime);
      dispatch(getConsumedSuccess(info));
    });
  }, []);

  return (
    <div>
      <Gauge
        title="Energy consumed now"
        value={props.consumedNow}
        maxValue={6}
      />
      <div className="sub-widget-container">
        <div className="sub-widget">
          <div className="sub-widget-title">Temp.</div>
          &nbsp;&nbsp;{props.temp}
        </div>
        <div className="sub-widget">
          <div className="sub-widget-title">Current time</div>
          &nbsp;&nbsp;{time}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    consumedNow: state.consumed.consumedNow,
    temp: state.consumed.temp,
  };
};
export default connect(mapStateToProps)(Consumed);
