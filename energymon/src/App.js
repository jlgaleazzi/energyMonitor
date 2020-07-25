import React, { useState, useEffect, useRef } from "react";
import Gauge from "./components/gauge";
import { connectToSolar } from './api/solarAPI'

import "./App.css";

function App() {
  const [solarEnergy, setSolarEnergy] = useState(0);
  const [solarMax, setSolarMax] = useState(3.7);
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
    connectToSolar()
  });

  return (
    <header className="App-header">
      <div className="container">
        <Gauge
          title="Solar energy produced"
          value={solarEnergy}
          maxValue={solarMax}
        ></Gauge>
      </div>
    </header>
  );
}

export default App;
