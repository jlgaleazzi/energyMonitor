import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Solar from "./components/solar";
import { connectToSolar } from "./api/solarAPI";

import "./App.css";

function App() {
  // const [consumedEnergy, setConsumedEnergy] = useState(2.34);
  // const [consumedMax, setConsumedMax] = useState(5.6);
  // const socketURL = `ws://${window.location.hostname}:5431`;
  useEffect(() => {
    // solar stuff
    // let solarSocket = new WebSocket(`${socketURL}/solar`);
    // solarSocket.addEventListener("open", (e) => {
    //   solarSocket.send("ProducePanel Connected");
    // });
    // solarSocket.addEventListener("message", (e) => {
    //   console.log("received solar data");
    //   let data = JSON.parse(e.data);
    //   let kwh = data.production[1].wNow / 1000;
    //   console.log(kwh);
    //   setSolarEnergy(kwh);
    // });

    // current cost
    connectToSolar();
  });

  return (
    <header className="App-header">
      <Solar />
    </header>
  );
}

export default App;
