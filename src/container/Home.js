import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FireBaseTools from '../util/firebase.js';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

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
		  		<div>
                    <div>Login</div>
                    <TextField
                      hintText="E-mail"
                      floatingLabelText="E-mail"
                      onChange={(e, newValue) => {
                        this.setState({
                            email: newValue
                        })
                      }}
                    />
                    <TextField
                      hintText="Password"
                      floatingLabelText="Password"
                      type="password"
                      onChange={(e, newValue) => {
                        this.setState({
                            password: newValue
                        })
                      }}
                    />
                    <RaisedButton
                      label="Login"
                      secondary={true}
                      icon={<ActionAndroid />}
                      onClick={() => {
                        FireBaseTools.loginUser({
                            email: this.state.email,
                            password: this.state.password,
                        })
                        .then(result => console.log(result))
                        .catch((error) => {
                          console.log(error)
                        })
                    }}
                    />
                    <FlatButton label="Main">
                        <Link to="/main">Main</Link>
                    </FlatButton>
                    <RaisedButton
                      label="Logout"
                      primary={true}
                      icon={<ActionAndroid />}
                      onClick={() => {
                        FireBaseTools.logoutUser()
                        .then(result => console.log(result))
                        .catch((error) => {
                          console.log(error)
                        })
                    }}
                    />
                </div>
		  	</div>
        );
    }
}

export default Home;
