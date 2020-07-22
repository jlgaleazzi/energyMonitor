import React, {useState, useEffect, useRef} from 'react';
import Gauge from "./components/gauge"

import './App.css';

// peak power for solar is around 3.7
// peak power for consumed energy is ??



function App() {
const [solarEnergy,setSolarEnergy] = useState(3.50);
const [solarMax, setSolaerMax] = useState(3.7);

  return (
   <Gauge 
   title="Solar energy produced"
   value={solarEnergy}
   maxValue={maxValue}
   ></Gauge>
  );
}

export default App;
