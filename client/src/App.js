import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import ProducingPanel from './components/producingpanel'

class App extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className='App'>
                <ProducingPanel/>
            </div>
        )
    }
}

export default hot(module)(App);