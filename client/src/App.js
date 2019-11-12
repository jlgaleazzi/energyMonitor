import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        // connect to socket server
        let socket = new WebSocket('ws://10.118.87.125:80/');
        socket.addEventListener('open',((e) => {
            socket.send('hello');
        }))
        socket.addEventListener('message',((e) => {
           console.log('receiving message'+e)
            console.log(e.data);
        }));
    }

    render(){
        return (
            <div className='App'>
                <h1>My MVP App</h1>
            </div>
        )
    }
}

export default hot(module)(App);