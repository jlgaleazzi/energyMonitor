// node js server for energymon
const fs = require("fs");
const Path = require("path");
const xmltojs = require("xml2js");
const axios = require("axios");
const events = require("events");
const express = require("express");
const app = express();
const port = 5431;
const ws = require("express-ws")(app);

const solarE = new events.EventEmitter();
const consumedE = new events.EventEmitter();
app.use(express.static(Path.join(__dirname, "/../energymon/build")));
app.ws("/ccin", (ws, req) => {
  console.log("ccin");
  ws.on("message", (msg) => {
    console.log("received ccin:" + msg);
    let xml = msg;
    xmltojs.parseString(xml, (err, res) => {
      if (err) {
        console.log("error parsing data");
        console.log(xml);
        ws.send("error parsing data");
      } else {
        let path = Path.resolve(__dirname, "readings/consumption.json");
        if (
          res !== null &&
          res.msg !== undefined &&
          res.msg.hasOwnProperty("hist")
        ) {
          // save or append to file
          console.log("saving history file");
          let histPath = Path.resolve(__dirname, "readings/history.json");
          fs.appendFile(histPath, `${JSON.stringify(res)}\n`, (err) => {
            if (err) {
              console.log("Error appending file " + err);
            }
          });
        } else {
          fs.writeFile(path, JSON.stringify(res), (err) => {
            if (err) {
              console.log("error writing file " + err);
            }
          });
          if (res !== null && res.msg !== undefined) {
            const edata = {};
            edata.time = res.msg.time[0];
            edata.tmp = res.msg.tmprF[0];
            edata.watts =
              Number(res.msg.ch1[0].watts) + Number(res.msg.ch2[0].watts);
            consumedE.emit("newData", edata);
          }
        }
        ws.send("received payload");
      }
    });
  });
});

app.ws("/solar", (ws, req) => {
  ws.on("message", (msg) => {
    console.log("solar receive from client " + msg);
    getData();
    solarE.on("data", (data) => {
      console.log(`sending data ${JSON.stringify(data)}`);
      ws.send(JSON.stringify(data), (err, res) => {
        if (err) {
          console.log("there was an error - solar");
        }
      });
    });
  });
});

app.ws("/ccout", (ws, req) => {
  ws.on("message", (msg) => {
    console.log("ccout received from client: " + msg);
    consumedE.on("newData", (data) => {
      let jsonData = JSON.stringify(data);
      //console.log('send new data '+jsonData);
      ws.send(jsonData, (err, res) => {
        if (err) {
          console.log("there was an error -- ccout");
        }
      });
    });
  });
});

app.get("/", (req, res, next) => {
  res.end();
});

app.listen(port, () =>
  console.log(`Energy Monitor (0.03) listening on port  ${port}`)
);

setInterval(() => {
  getData();
}, 10000);

const getData = (cb) => {
  axios
    .get("http://10.118.87.104/production.json")
    .then((response) => {
      data = response.data;
      solarE.emit("data", data);
      var time = data.production[1].readingTime;
      var d = new Date(0);
      d.setUTCSeconds(time);
      let day = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      let filename = `${year}_${month}_${day}`;
      let path = Path.resolve(__dirname, `readings/${filename}.json`);
      fs.appendFile(path, `${JSON.stringify(data)}\n`, (err) => {
        if (err) {
          console.log("Error appending file " + err);
        }
      });
    })
    .catch((err) => {
      console.log(err + " nodata");
    });
};
