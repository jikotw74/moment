import React, { Component } from 'react';
import './App.css';

import Main from './component/Main';
import Home from './component/Home';
import Guest from './component/Guest';

import { firebaseAuth } from './util/firebase.js'
// import { ADMIN_LIST } from './config';

import Paper from 'material-ui/Paper';
import FireBaseTools from './util/firebase';

import firebase from 'firebase';

import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authed: false,
            loading: true,
            user: false,
            settings: false
        };
    }
    componentDidMount () {
        this.removeListener = firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                let ref = FireBaseTools.getDatabaseReference('/userSettings/' + user.uid);
                if(ref){
                    ref.on('value', snap => {
                        let settings = snap.val();
                        if(!settings){
                            ref.set({
                                admin: false,
                                confirmed: false,
                                email: user.email,
                                d: firebase.database.ServerValue.TIMESTAMP
                            })
                        }else{
                            this.setState({
                                authed: true,
                                loading: false,
                                user: user,
                                settings: settings
                            })
                        }
                    });
                }                
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
                <div className="App">
                    <CircularProgress size={80} thickness={5} />
                </div>
            )
        }

        let body;
        if(this.state.authed && this.state.settings.confirmed){
            body = <Main settings={this.state.settings}/>
        }else if(this.state.authed){
            body = <Guest email={this.state.user.email}/>
        }else{
            body = <Home />
        }

        return (
            <div className="App">
                <Paper zDepth={2}>
                    {body}
                </Paper>
            </div>
        );
    }
}

export default App;
