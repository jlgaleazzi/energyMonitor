// node js server for energymon 
const express = require('express');
const app = express();
const port = '3002';
const net = require('net');
const fs = require('fs')
const Path = require('path');
const xmltojs = require('xml2js');
const axios = require('axios');
const WebSocket = require('ws');
const events = require('events');
const wss = new WebSocket.Server({port:54321});

const emitter = new events.EventEmitter();

wss.on('connection', (ws) => { 

  emitter.on('newData', (data) => {
     ws.send(JSON.stringify(data));
    })
    
})
let fakeData = [];

setInterval(()=> {
    getData();
},10000)

const getData = ((cb) =>{
    axios.get('http://10.118.87.104/production.json')
    .then((response)=>{
        console.log('gotData from server');
        data = response.data;
        emitter.emit('newData',data);
        var time = data.production[1].readingTime;
        var d = new Date(0);
        d.setUTCSeconds(time);
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
        let filename = `${year}_${month}_${day}`;
        console.log('fileName '+filename)
        let path = Path.resolve(__dirname,`readings/${filename}.json`)
        console.log('path:'+path);
        fs.appendFile(path,`${JSON.stringify(data)}\n`, (err) => {
            if (err) {
                console.log('Error appending file '+err)
            }
        })

    })
    .catch((err)=> {
        console.log('nodata');
         simulateData((err,result) => {
                //console.log(JSON.stringify(result));
                emitter.emit('newData',result);
             })
         });
    })    
   


getData();
let dataCounter = 430;
const getOldData = () => {
    console.log('dataCounter '+dataCounter);
    if (dataCounter > fakeData.length -1) {
        dataCounter = 400;
    }
    return fakeData[dataCounter++];
    
}

const simulateData = (cb) => {
    if (fakeData.length === 0) {
        var path = Path.resolve(__dirname,'readings/2019_10_12.json');
        fs.readFile(path,(err,file) => {
            if (err) {
                console.log(err)
                cb(err,null);
            } else {
                fakeData = JSON.parse(file);
                console.log('fakeData length:' +fakeData.length);
                //cb(null,file);
                cb(null,getOldData());
                
            }
        })
       
    } else  
    {
        cb(null,getOldData());
    }
};



const server = net.createServer((client) =>{
    console.log(`client connected , Client local address : ${client.localAddress}: `);
    client.setEncoding('utf-8');
    client.setTimeout(60000);
    client.on('data', (data) => {
        console.log('Receive data\n');
        let xml = data;
      
        xmltojs.parseString(xml,(err,res) => {
            if (err) {
                console.log('error parsing data')
            } else
            {
                emitter.emit('newData',res )
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
                        } else {
                            console.log('send newData')
                        
                        }
                    })
                }
            }
            
            // fs.writeFile(path, JSON.stringify(res),(err) => {
            //     if (err) {
            //         console.log('error writing file')
            //     } else {
            //         console.log('send newData')
                
            //     }
            // } )
        } )
    })

    client.on('end', () => {
        console.log('Client disconnected');
        server.getConnections((err,count)=> {
            if (!err) {
                console.log(`there are ${count} connections now`);
            } else
            {
                console.error(JSON.stringify(err));
            }
        });
    });

    client.on('timeout', () => {
        console.log('client timed out');
    })
    
})

server.listen(65432, () => {
    const serverInfo = server.address();
    const serverInfoJson = JSON.stringify(serverInfo);
    console.log("Socket Server listening on  "+serverInfoJson);
    server.on('close', () => {
        console.log('Socket Server closed');
    })
    server.on('error', (err) => {
        console.error(JSON.stringify(err));
    })


})
