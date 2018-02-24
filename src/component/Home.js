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
                {
                    // <TextField
                    //     hintText="E-mail"
                    //     floatingLabelText="E-mail"
                    //     onChange={(e, newValue) => {
                    //         this.setState({
                    //             email: newValue
                    //         })
                    //     }}
                    // />
                    // <TextField
                    //     hintText="Password"
                    //     floatingLabelText="Password"
                    //     type="password"
                    //     onChange={(e, newValue) => {
                    //         this.setState({
                    //             password: newValue
                    //         })
                    //     }}
                    // />
                    // <RaisedButton
                    //     label="Login"
                    //     secondary={true}
                    //     icon={<ActionAndroid />}
                    //     onClick={() => {
                    //         FireBaseTools.loginUser({
                    //             email: this.state.email,
                    //             password: this.state.password,
                    //         })
                    //         .catch((error) => {
                    //             console.log(error)
                    //         })
                    //     }}
                    // />
                    // <RaisedButton
                    //     label="Logout"
                    //     primary={true}
                    //     icon={<ActionAndroid />}
                    //     onClick={() => {
                    //         FireBaseTools.logoutUser()
                    //         .catch((error) => {
                    //             console.log(error)
                    //         })
                    //     }}
                    // />
                }
                
                <RaisedButton
                    label="Sign in with Google"
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
