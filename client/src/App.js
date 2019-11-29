import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import './App.css'
import ProducingPanel from './components/producingpanel'
import ConsumePanel from './components/consumePanel'

class App extends Component {
    constructor(props) {
        super(props);


    }


    render(){
        return (
            <div className='App'>
                <ProducingPanel/>
                <ConsumePanel/>
            </div>
        )
    }
}

export default hot(module)(App);