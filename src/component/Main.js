import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TopBar from './TopBar';
import ActionGroup from './ActionGroup';
import Action from './Action';
import FireBaseTools from '../util/firebase';
const colors = require('material-ui/styles/colors.js');
const colorsArray = Object.keys(colors).filter(colorName => colorName.indexOf('green') !== -1).map(colorName => colors[colorName]);

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
	      data: {}
	    };
    }

    componentWillMount() {
        const ref = FireBaseTools.getDatabaseReference('/').orderByKey();
	    if (ref) {
	      	ref.on('value', snap => {
	        	var data = snap.val();
	          			
			    this.setState({
			    	data:data
			    });
	      	});
	    }
    }

 //    shuffle = (o) => {
	// 	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	// 	return o;
	// };

    render() {
    	const groups = this.state.data.actionGroups;
    	const actions = this.state.data.actions;
    	var rows = [];
    	if(groups){
    		rows = groups.map((group, groupIndex) => {
	    		const children = actions.filter((action, actionIndex) => {
	    			return action.group*1 === groupIndex*1;
	    		}).map((action, actionIndex) =><Action key={actionIndex} name={action.name}/>)

	    		return <ActionGroup 
		        	key={groupIndex} 
		        	title={group.name}
		        	bgColor={colorsArray[groupIndex]}
		      	>{children}</ActionGroup>
	    	});
    	}

        return ( 
            <div className="Main">
		  		<TopBar />
		  		<div className="group-list">
		  			{rows}
		  		</div>
		  		<RaisedButton label="Go" onTouchTap={this.handleClose}/>
		  	</div>
        );
    }
}

export default Main;