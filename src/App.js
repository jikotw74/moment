import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FireBaseTools from './util/firebase';
import ActionGroup from './component/ActionGroup';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './component/MyAwesomeReactComponent';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  constructor(){
    super();
    this.state = {
      speed:""
    };
  }

  componentWillMount(){
    const speedRef = FireBaseTools.getDatabaseReference('test/speed');

    speedRef.on('value', snap => {
      this.setState({
        speed: snap.val()
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React1233</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>{this.state.speed}</h1>
        <ActionGroup id="1"/>
        <MuiThemeProvider>
          <MyAwesomeReactComponent />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
