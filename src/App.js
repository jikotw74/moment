import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './component/Main';
import Home from './container/Home';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'

import { firebaseAuth } from './util/firebase.js'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

function PrivateRoute ({component: Component, authed, ...rest}) {
  console.log('PrivateRoute', authed)
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authed: false,
            loading: true,
        };
    }
    componentDidMount () {
        this.removeListener = firebaseAuth.onAuthStateChanged((user) => {
          console.log('onAuthStateChanged', user);

            if (user) {
                this.setState({
                authed: true,
                loading: false,
                })
            } else {
                this.setState({
                    authed: false,
                    loading: false
                })
            }

            console.log(this.state);
        })
    }
  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <PrivateRoute authed={this.state.authed} path='/main' component={Main} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
