import React, { Component } from 'react';
import './App.css';

import Main from './component/Main';
import Home from './component/Home';

import { firebaseAuth } from './util/firebase.js'
import { ADMIN_LIST } from './config';

import Paper from 'material-ui/Paper';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authed: false,
            loading: true,
            user: false,
        };
    }
    componentDidMount () {
        this.removeListener = firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authed: true,
                    loading: false,
                    user: user
                })
            } else {
                this.setState({
                    authed: false,
                    loading: false,
                    user: false
                })
            }
        })
    }
    componentWillUnmount () {
        this.removeListener()
    }

    render() {
        if(this.state.loading){
            return (
                <div className="App">loading</div>
            )
        }
        return (
            <div className="App">
                <Paper zDepth={2}>
                    {this.state.authed ? <Main admin={ADMIN_LIST.indexOf(this.state.user.uid) !== -1}/> : <Home />}
                </Paper>
            </div>
        );
    }
}

export default App;
