import React, { Component } from 'react';
import './Home.css';
// import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import ActionAndroid from 'material-ui/svg-icons/action/android';
import FireBaseTools from '../util/firebase.js';
// import FlatButton from 'material-ui/FlatButton';

class Home extends Component {
	constructor(props) {
        super(props);
        this.state = {
            email: false,
            password: false
	    };
    }

    componentWillMount() {
    }

    render() {

        return ( 
            <div className="Home">		  		
                <div className="Home-title">posing</div>
                                
                <RaisedButton
                    label="按此以 Google 帳號登入"
                    primary={true}
                    onClick={() => {
                        FireBaseTools.loginWithProvider('google')
                        .catch((error) => {
                            console.log(error)
                        })
                    }}
                />
		  	</div>
        );
    }
}

export default Home;
