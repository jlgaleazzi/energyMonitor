import socket
import asyncio
class Echo

HOST = ''
PORT = 65432

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print('connected by', addr)
        while True:
            data = conn.recv(58600)
            print(data)