import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getConsumedSuccess } from "../redux/actions/consumedActions";
import propTypes from "prop-types";
import Gauge from "./gauge";

const Consumed = (props) => {
  const socketURL = `ws://${window.location.hostname}:5431`;
  //const socketURL = `ws://miniserver.local:5431`;
  const dispatch = useDispatch();
  const [consumedNow, setConsumedNow] = useState(props.consumedNow);
  const consumedSocket = new WebSocket(`${socketURL}/ccout`);
  useEffect(() => {
    consumedSocket.addEventListener("open", () => {
      consumedSocket.send("ConsumedPanel Connected");
    });
    consumedSocket.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);
      let watts = Number(data.watts).toFixed(2);
      dispatch(getConsumedSuccess(watts));
    });
  }, [dispatch, consumedSocket]);

  return (
    <Gauge title="Energy Consumption" value={props.consumedNow} maxValue={6} />
  );
};

const mapStateToProps = (state) => {
  return {
    consumedNow: state.consumed.consumedNow,
  };
};
export default connect(mapStateToProps)(Consumed);
