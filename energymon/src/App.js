import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Solar from "./components/solar";
import Consumed from "./components/consumed";

import "./App.css";

function App() {
  return (
    <header className="App-header">
      <Solar />
      <Consumed />
    </header>
  );
}

export default App;
