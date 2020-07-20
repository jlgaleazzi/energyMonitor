import React from 'react';
import chart from './assets/dash.svg';
import './App.css';




function App() {
  const chartTitle = "me la pelas"
  return (
    <div className="App">
      <header className="App-header">
        <svg xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 344.54 230.03"
          id="graphica">
          <defs>
            <style>{`.cls-1{stroke:#000;stroke-miterlimit:10;stroke-width:4px;}.cls-2{fill:none;stroke-linecap:round;stroke-linejoin:bevel;stroke-width:15px;stroke:url(#linear-gradient);}.cls-3{font-size:12px;fill:#5a5a89;font-family:Roboto-Medium, Roboto;font-weight:500;}.cls-4{letter-spacing:0.01em;}.cls-5{letter-spacing:-0.02em;}.cls-6{letter-spacing:-0.03em;}.cls-7{font-size:60px;}.cls-7,.cls-8{fill:#fff;font-family:Arial-Black, Arial Black;font-weight:800;}.cls-8{font-size:24.26px;}.cls-9{letter-spacing:0.03em;}.cls-10{fill:#282856;}.cls-11{fill:#ffa63f;}`}</style>
            <linearGradient id="linear-gradient" x1="2.09" y1="115.51" x2="342.69" y2="115.51" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7817f8" /><stop offset="0.16" stop-color="#8118f9" /><stop offset="0.43" stop-color="#9b1bfa" /><stop offset="0.77" stop-color="#c420fd" /><stop offset="0.99" stop-color="#e323ff" />
            </linearGradient>
          </defs>
          <g id="Chart" data-name="Chart">
            <g id="main-group">
              <path class="cls-1" id="semi-circle-bg" d="M17.06,228a7.5,7.5,0,0,1-7.12-5.17c-16.57-50.44-6.86-107.13,26-151.64A174.08,174.08,0,0,1,94.49,20.6,159.63,159.63,0,0,1,172.2,2a159.48,159.48,0,0,1,77.68,18.57,175.56,175.56,0,0,1,89.83,121.94,160.33,160.33,0,0,1-5.19,80.15A7.5,7.5,0,0,1,320.27,218c15-45.81,6.07-97.37-23.87-137.93a159.07,159.07,0,0,0-53.5-46.21A144.66,144.66,0,0,0,172.33,17h-.26a144.5,144.5,0,0,0-70.59,16.86A159.1,159.1,0,0,0,48,80.12C18,120.73,9.13,172.34,24.19,218.18a7.5,7.5,0,0,1-4.79,9.47A7.59,7.59,0,0,1,17.06,228Z" />
              <path class="cls-2" id="semi-circle-front" d="M17.24,221c-33.48-102,47.3-212.87,155.15-211C280.14,8.15,361,118.92,327.58,220.85" />
              <text class="cls-3" id="graph-title" transform="translate(135.68 146.88)">{chartTitle}</text>
              <text class="cls-7" id="graph-value" transform="translate(67.14 204.33) scale(1.09 1)">5.95 </text>
              <text class="cls-8" id="measure" transform="translate(224.88 204.1)">kWh</text>

              <g id="ligthing_group">
                <circle id="bolt-bg" class="cls-10" cx="173.88" cy="86.02" r="29" />
                <path id="bolt" class="cls-11" d="M162,89.84h10.27l-5.48,14.76c-.48,1.31.81,2,1.66.9l16.11-20.2a1.45,1.45,0,0,0,.37-.86.77.77,0,0,0-.83-.76H173.78l5.47-14.77c.49-1.3-.8-1.93-1.65-.89l-16.11,20.2a1.37,1.37,0,0,0-.38.85A.77.77,0,0,0,162,89.84Z" />
              </g>
            </g>
          </g>
        </svg>
      </header>
    </div>
  );
}

export default App;
