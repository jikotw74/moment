import React, { Component } from 'react';
import './ActionGroup.css';

class ActionGroup extends Component {

  render() {    
    return (
      <div className="ActionGroup" style={{backgroundColor: this.props.bgColor}}>
        <div className="ActionGroup__title">{this.props.title}</div>
        <div className="ActionGroup__actions">{this.props.children}</div>
      </div>
    );
  }
}

export default ActionGroup;
