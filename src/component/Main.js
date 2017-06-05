import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TopBar from './TopBar';
import ActionGroup from './ActionGroup';
import Action from './Action';
import FireBaseTools from '../util/firebase';
const colors = require('material-ui/styles/colors.js');
const colorsArray = Object.keys(colors).filter(colorName => colorName.indexOf('green') !== -1).map(colorName => colors[colorName]);
let groups = {};
let actions = {};
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
		const shuffle = (a) => actions[a[parseInt(Math.random() * a.length, 10)]];

		using = Object.keys(groups).map((groupKey) => {
			let actionsInGroup = Object.keys(actions).filter((actionKey, actionIndex) => {
				let action = actions[actionKey];
	    		return action.group === groupKey;
	    	});
			return {
				groupKey: groupKey,
				action: shuffle(actionsInGroup)
			};
		});

		init = true;
		this.setState({
			init: init
		});
		console.log('using', using);
	}

	getColor = index => colorsArray[index % 5];

    render() {
    	const rows = Object.keys(groups).map((groupKey, groupIndex) => {
    		let group = groups[groupKey];
    		let children;
    		if(this.state.init){
    			children = using.filter((snap, snapIndex) => {
		    		return snap.groupKey === groupKey && snap.action;
		    	}).map((snap, snapIndex) => <Action key={snapIndex} name={snap.action.name}/>)
    		}else{
    			children = Object.keys(actions).filter((actionKey, actionIndex) => {
    				let action = actions[actionKey];
		    		return action.group === groupKey;
		    	}).map((actionKey, actionIndex) => {
		    		let action = actions[actionKey];
		    		return <Action key={actionKey} name={action.name}/>
		    	})
    		}

	    	return <ActionGroup 
		        key={groupKey} 
		        title={group.name}
		        bgColor={this.getColor(groupIndex)}
		    >{children}</ActionGroup>
	    });

        return ( 
            <div className="Main">
		  		<TopBar groups={groups} actions={actions}/>
		  		<div className="group-list">
		  			{rows}
		  		</div>
		  		<RaisedButton label="開始產生" secondary={true} onTouchTap={this.go}/>
		  	</div>
        );
    }
}

export default Main;
