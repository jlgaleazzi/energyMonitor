// node js server for energymon
const fs = require('fs')
const Path = require('path');
const xmltojs = require('xml2js');
const axios = require('axios');
const events = require('events');
const express = require('express');
const app = express();
const port = 80;
const ws = require('express-ws')(app);


app.ws('/ccin', (ws,req) => {
    ws.on('message',(msg) => {
        // process data
            let xml = msg;
            xmltojs.parseString(xml,(err,res) => {
                if (err) {
                    console.log('error parsing data')
                    ws.send('error parsing data');
                } else
                {
                    consumedE.emit('newData',res);
                    let path = Path.resolve(__dirname,'readings/consumption.json')
                    if (res.msg.hasOwnProperty('hist')) {
                        // save or append to file
                        console.log('saving history file');
                        let histPath = Path.resolve(__dirname,'readings/history.json')
                        fs.appendFile(histPath,`${JSON.stringify(res)}\n`, (err) => {
                            if (err) {
                                console.log('Error appending file '+err)
                                }
                            })
                    } else {

                        fs.writeFile(path, JSON.stringify(res),(err) => {
                            if (err) {
                                console.log('error writing file '+err)
                            }
                        })
                    }
                }
            ws.send('received payload')
        })
    })
})

app.use((req,res,next)=> {
    console.log('middleware');
    req.testing = 'testing';
    return next();
})

app.ws('/solar', (ws,req) => {
    ws.on('connection',(ws) => {
        solarE.on('data'), data => {
            console.log('solar '+JSON.stringify(data))
            ws.send(JSON.stringify(data));
        }
    })

})

app.ws('/ccout', (ws,req) => {
    ws.on('connection',(ws) => {
        consumedE.on('newData',(data) => {
           console.log('send new data '+data);
            ws.send(data);
        })
    })
})

app.get('/', (req,res,next) => {
    res.end();
})

app.listen(port,() => console.log(`Express listening on port ${port}`));

const solarE = new events.EventEmitter();
const consumedE = new events.EventEmitter();

setInterval(()=> {
    getData();
},10000)

const getData = ((cb) =>{
    axios.get('http://10.118.87.104/production.json')
    .then((response)=>{
        data = response.data;
        solarE.emit('data',data);
        var time = data.production[1].readingTime;
        var d = new Date(0);
        d.setUTCSeconds(time);
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
        let filename = `${year}_${month}_${day}`;
        let path = Path.resolve(__dirname,`readings/${filename}.json`)
        fs.appendFile(path,`${JSON.stringify(data)}\n`, (err) => {
            if (err) {
                console.log('Error appending file '+err)
            }
        })

    })
    .catch((err)=> {
        console.log('nodata');
         });
    })

    getData();


