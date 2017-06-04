import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TopBar from './TopBar';
import ActionGroup from './ActionGroup';
import Action from './Action';
import FireBaseTools from '../util/firebase';
const colors = require('material-ui/styles/colors.js');
const colorsArray = Object.keys(colors).filter(colorName => colorName.indexOf('green') !== -1).map(colorName => colors[colorName]);
let groups = [];
let actions = [];
let init = false;
let using = [];

class Main extends Component {
	constructor(props) {
        super(props);
        this.state = {
	      init: init
	    };
    }

    componentWillMount() {
        const ref = FireBaseTools.getDatabaseReference('/').orderByKey();
	    if (ref) {
	      	ref.on('value', snap => {
	        	var data = snap.val();
			    groups = data.actionGroups;
			    actions = data.actions;
			    this.setState({
			    	init: init
			    });
			    console.log('groups', groups);
			    console.log('actions', actions);
	      	});
	    }
    }

	go = () => {
		const shuffle = (a) => a[parseInt(Math.random() * a.length, 10)];
		using = groups.map((group, groupIndex) => {
			let actionsInGroup = actions.filter((action, actionIndex) => {
	    		return action.group*1 === groupIndex*1;
	    	});
			return {
				groupIndex: groupIndex,
				action: shuffle(actionsInGroup)
			};
		});

		init = true;
		this.setState({
			init: init
		});
		console.log(using);
	}

    render() {
    	const rows = groups.map((group, groupIndex) => {
    		let children;
    		if(this.state.init){
    			children = using.filter((snap, snapIndex) => {
		    		return snap.groupIndex*1 === groupIndex*1;
		    	}).map((snap, snapIndex) => <Action key={snapIndex} name={snap.action.name}/>)
    		}else{
    			children = actions.filter((action, actionIndex) => {
		    		return action.group*1 === groupIndex*1;
		    	}).map((action, actionIndex) => <Action key={actionIndex} name={action.name}/>)
    		}

	    	return <ActionGroup 
		        key={groupIndex} 
		        title={group.name}
		        bgColor={colorsArray[groupIndex]}
		    >{children}</ActionGroup>
	    });

        return ( 
            <div className="Main">
		  		<TopBar groups={groups} actions={actions}/>
		  		<div className="group-list">
		  			{rows}
		  		</div>
		  		<RaisedButton label="Go" onTouchTap={this.go}/>
		  	</div>
        );
    }
}

export default Main;
