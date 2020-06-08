## Energy Monitor
Energy monitor is an energy monitoring utility to monitor my solar panel production as well as my energy consumption.

The front end is created with the React library, using Websockets to communicate with an Express (Node.js) server.

To monitor my Energy consumption I use the Current Cost ENV45 . The ENV 45 has a RJ 45 plug where I connected a Cat 5 cable and then proceed to cut the other side to reveal all the wires, To Connect it to the raspberry Pi I only need the data out, and the ground cable.

with the ENV45 sends streams of xml every 10 seconds, The Raspberry Pi just relays that information to my server, where I convert it to JSON and is transmited to the client y web sockets when they connect

The energy production is done by accesing the local empase energy monitoring server which outputs json with the data

