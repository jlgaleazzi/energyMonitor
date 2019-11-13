Energy monitor is a energy monitoring utility to monitor my solar panel production as well as my energy consumption

To monitor my Energy consumption I use the Current Cost ENV45 attached to raspberry pi via a cat5 cable , the ENV45 sends streams of xml every 10 seconds, The Raspberry Pi just relays that information to my server, where I convert it to JSON and is transmited to the client y web sockets when they connect

The energy production is done by accesing the local empase energy monitoring server which outputs json with the data

