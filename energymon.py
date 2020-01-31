import time
import serial
import io
import asyncio
import websockets

HOST = 'ws://miniserver.local:5431/ccin'


ser = serial.Serial(
    port='/dev/ttyS0',
    baudrate=57600,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
    timeout=1
)

sio = io.TextIOWrapper(io.BufferedRWPair(ser, ser))


async def send(xml):
    # parse xml. convert to json and save in file
    print('connecting')
    async with websockets.connect(HOST) as websocket:
        await websocket.send(xml)
        response = await websocket.recv()
        print(response)


while 1:
    try:
        xml = sio.readline()
        if xml:
            asyncio.get_event_loop().run_until_complete(send(xml))
    except:
        print('problem reading xml')
