import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Solar from "./components/solar";
import Consumed from "./components/consumed";

import "./App.css";

function App() {
  return (
    <div className="App-header">
      <Solar />
      <Consumed />
    </div>
  );
}

export default App;
