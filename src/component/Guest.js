import React, { Component } from 'react';
import './Guest.css';
// import TextField from 'material-ui/TextField';
// import ActionAndroid from 'material-ui/svg-icons/action/android';
import FireBaseTools from '../util/firebase.js';
// import FlatButton from 'material-ui/FlatButton';

class Guest extends Component {
	constructor(props) {
        super(props);
        this.state = {
	    };
    }

    componentWillMount() {
    }

    render() {

        return ( 
            <div className="Guest">		  		
                <div className="Guest-title">posing</div>
                                
                <div className="Guest-content">{this.props.email + " 等待管理員審核中"}</div>
		  	</div>
        );
    }
}

export default Guest;
