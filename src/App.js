import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './component/Main';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  componentDidMount(){
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Main />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
