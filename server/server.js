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

setInterval(()=> {
    getData();
},10000)

const getData = ((cb) =>{
    axios.get('http://10.118.87.104/production.json')
    .then((response)=>{
        console.log('gotData from server');
        data = response.data;
    })
    .catch((err)=> {
        //console.log(err);
         simulateData((err,result) => {
             data = JSON.parse(result);
             let wnow =  Number(Math.random() * 2).toFixed(2) ;
             data.production[1].wNow = wnow;
             emitter.emit('newData',data);
         });
    })
    
   
})

getData();

const simulateData = (cb) => {
    var path = Path.resolve(__dirname,'panels.json');
    fs.readFile(path,(err,file) => {
        if (err) {
            console.log('error reading File')
            cb(err,null);
        } else {
            //console.log('file' +file);
            cb(null,file);
        }
    })
};



const server = net.createServer((client) =>{
    console.log(`client connected , Client local address : ${client.localAddress}: `);
    client.setEncoding('utf-8');
    client.setTimeout(60000);
    client.on('data', (data) => {
        console.log('Receive data\n');
        let xml = data;
        let path = Path.resolve(__dirname,'jsonfile.json')
        xmltojs.parseString(xml,(err,res) => {
            fs.writeFile(path, JSON.stringify(res),(err) => {
                if (err) {
                    console.log('error writing file')
                } else {
                    console.log(JSON.stringify(res));
                }
            } )
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
