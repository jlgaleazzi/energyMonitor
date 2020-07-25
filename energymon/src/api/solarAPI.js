import { handleResponse } from "./apiUtils";

const socketURL = `ws://${window.location.hostname}:5431`;

export function connectToSolar() {
  let solarSocket = new WebSocket(`${socketURL}/solar`);
  solarSocket.addEventListener("open", () => {
    solarSocket.send("ProducePanel Connected");
  });
  solarSocket.addEventListener("message", (e) => {
    const solarData = JSON.parse(e.data);
    handleResponse(solarData);
  });
}
