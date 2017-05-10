import React, { Component } from 'react';
import FireBaseTools from '../util/firebase';
import ActionGroup from './ActionGroup';
var colors = require('material-ui/styles/colors.js');
var colorsArray = Object.keys(colors).filter(colorName => colorName.indexOf('green') !== -1).map(colorName => colors[colorName]);

class ActionGroupList extends Component {

  constructor(){
    super();
    this.state = {
      data:[]
    };
  }

  componentDidMount(){
    // const actionGroupRef = FireBaseTools.getDatabaseReference('actionGroups/' + this.props.id);
    const groupsRef = FireBaseTools.getDatabaseReference('actionGroups').orderByKey()
    if (groupsRef) {
      groupsRef.on('value', snap => {
        let data = [];
        snap.forEach(childSnapshot => {

          data.push(childSnapshot.key);
        });
        this.setState({
          data:data
        });
      });
    }
    console.log(colorsArray);
  }

  render() {
    const rows = this.state.data.map((item, index) => 
      <ActionGroup 
        key={index} 
        id={item}
        bgColor={colorsArray[index]}
      />
    );
    return (
      <div className="ActionGroupList">
        {rows}
      </div>
    );
  }
}

export default ActionGroupList;
