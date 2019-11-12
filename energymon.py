import time
import serial
import socket

HOST = '10.118.87.112'
PORT = 65432



ser = serial.Serial(
    port='/dev/ttyS0',
    baudrate = 57600,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
    timeout=1
    )

def send(xml):
    # parse xml. convert to json and save in file
    print('cnnecting')
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST,PORT))
        print('sending')
        print(xml)
        s.sendall(xml)
        s.close()
        print('closed connection')

while 1:
    xml = ser.readline()
    if xml:
        send(xml)
        
