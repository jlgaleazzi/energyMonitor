// node js server for energymon 
const fs = require('fs')
const Path = require('path');
const xmltojs = require('xml2js');
const axios = require('axios');
const WebSocketServer = require('ws').Server;
const events = require('events');
const http = require('http');
const url = require('url');
const server = http.createServer();

const solar = new WebSocketServer({noServer:true});
const cc = new WebSocketServer({noServer:true});
const ccin = new WebSocketServer({noServer:true});

server.on('upgrade', (request,socket,head) => {
    const pathname = url.parse(request.url).pathname;

    switch(pathname) {
        case '/solar':
            solar.handleUpgrade(request,socket, head, (ws) => {
            solar.emit('connection', ws, request);
            })
        break;
        case '/ccou':
            cc.handleUpgrade(request,socket,head,(ws) => {
                cc.emit('connection',ws, request)
            })
        break;
        case '/ccin':
            ccin.handleUpgrade(request,socket,head,(ws) => {
                ccin.emit('connection',ws,request);
            })

        default:
            socket.destroy();
    }

});


const emitter = new events.EventEmitter();
const pemitter = new events.EventEmitter();
// pws.on('connection', (ws) => {

//     pemitter.on('pdata', (data) => {
//         ws.send(JSON.stringify(data));
//     })
// })

solar.on('connection', (ws) => { 
  emitter.on('newData', (data) => {
     ws.send(JSON.stringify(data));
    }) 
})

ccin.on('connection', (ws) => {
    ws.on('data',(data) => {
        console.log('Received data from current cost:\n');
        console.log(data);
    })
})



setInterval(()=> {
    getData();
},10000)

const getData = ((cb) =>{
    axios.get('http://10.118.87.104/production.json')
    .then((response)=>{
        console.log('gotData from solar server');
        data = response.data;
        emitter.emit('newData',data);
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

    server.listen(80);
// const getFakeProdData  =() => {
//     let msg = {watts: Math.floor(Math.random() * 14500)/1000 }
//     return msg;
// }

// 
// let dataCounter = 430;
// const getOldData = () => {
//     console.log('dataCounter '+dataCounter);
//     if (dataCounter > fakeData.length -1) {
//         dataCounter = 430;
//     }
//     return fakeData[dataCounter++];
    
// }

// const simulateData = (cb) => {
//     if (fakeData.length === 0) {
//         var path = Path.resolve(__dirname,'readings/2019_10_12.json');
//         fs.readFile(path,(err,file) => {
//             if (err) {
//                 console.log(err)
//                 cb(err,null);
//             } else {
//                 fakeData = JSON.parse(file);
//                 console.log('fakeData length:' +fakeData.length);
//                 //cb(null,file);
//                 cb(null,getOldData());
                
//             }
//         })
       
//     } else  
//     {
//         cb(null,getOldData());
//     }
// };



// const server = net.createServer((client) =>{
//     console.log(`client connected , Client local address : ${client.localAddress}: `);
//     client.setEncoding('utf-8');
//     client.setTimeout(60000);
//     client.on('data', (data) => {
//         console.log('Receive data\n');
//         let xml = data;
      
//         xmltojs.parseString(xml,(err,res) => {
//             if (err) {
//                 console.log('error parsing data')
//             } else
//             {
//                 emitter.emit('newData',res )
//                 let path = Path.resolve(__dirname,'readings/consumption.json')
//                 if (res.msg.hasOwnProperty('hist')) {
//                     // save or append to file 
//                     console.log('saving history file');
//                     let histPath = Path.resolve(__dirname,'readings/history.json')
//                     fs.appendFile(histPath,`${JSON.stringify(res)}\n`, (err) => {
//                         if (err) {
//                             console.log('Error appending file '+err)
//                             }   
//                          })
//                  } else {
                    
//                     fs.writeFile(path, JSON.stringify(res),(err) => {
//                         if (err) {
//                             console.log('error writing file '+err)
//                         } else {
//                             console.log('send newData')
                        
//                         }
//                     })
//                 }
//             }
            
            // fs.writeFile(path, JSON.stringify(res),(err) => {
            //     if (err) {
            //         console.log('error writing file')
            //     } else {
            //         console.log('send newData')
                
            //     }
            // } )
    //     } )
    // })



