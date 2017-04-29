import React, { Component } from 'react';
import './ActionGroup.css';
import FireBaseTools from '../util/firebase';
import Action from './Action';

class ActionGroup extends Component {

  constructor(){
    super();
    this.state = {
      data:[]
    };
  }

  componentDidMount(){
    // const actionGroupRef = FireBaseTools.getDatabaseReference('actionGroups/' + this.props.id);
    const actionsRef = FireBaseTools.getDatabaseReference('actions').orderByKey()
    if (actionsRef) {
      actionsRef.once('value', snap => {
        let data = [];
        snap.forEach(childSnapshot => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          if(this.props.id === childData.group){
            data.push(childKey);
          }
        });
        console.log(data);
        this.setState({
          data:data
        });
      });
    }
  }

  render() {
    const rows = this.state.data.map((item, index) => 
      <Action key={index} id={item}/>
    );
    return (
      <div className="ActionGroup">
        {rows}
      </div>
    );
  }
}

export default ActionGroup;
