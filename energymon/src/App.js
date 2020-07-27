import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Solar from "./components/solar";

import "./App.css";

function App() {
  return (
    <header className="App-header">
      <Solar />
    </header>
  );
}

export default App;
