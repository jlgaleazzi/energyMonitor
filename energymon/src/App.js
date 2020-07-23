import React, {useState, useEffect, useRef} from 'react';
import Gauge from "./components/gauge"

import './App.css';





function App() {
const [solarEnergy,setSolarEnergy] = useState(3.50);
const [solarMax, setSolarMax] = useState(3.7);
const [consumedEnergy, setConsumedEnergy] = useState(2.34)
const [consumedMax, setConsumedMax] = useState(5.6)

  return (
    
  <header className="App-header">
    <div className='container'>
    <Gauge 
      title="Solar energy produced"
      value={solarEnergy}
      maxValue={solarMax}
    ></Gauge>
   </div>
   <div className="container">
   <Gauge 
      title="Energy consumer"
      value={consumedEnergy}
      maxValue={consumedMax}
    ></Gauge>

   </div>
   </header>
  );
}

export default App;
