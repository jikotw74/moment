import React, { Component } from 'react';
import './TopBar.css';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import PoseDialogs from './PoseDialogs'
// import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';

class TopBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			group: {
				open: false,
				data: false,
			},
			action: {
				open: false,
				data: false,
			}
		};
	}

	handleToggle = () => this.setState({open: !this.state.open});

	handleClose = () => this.setState({open: false});

	dialogGroupClose = () => this.setState({
		group: {
			open: false,
			data: false
		}
	});

	dialogActionClose = () => this.setState({
		action: {
			open: false,
			data: false
		}
	});

	dialogGroupToggle = (data) => {
		if(!data)data = false;
		return () => {
			this.setState({
				group: {
					open: !this.state.group.open,
					data: data
				}
			});
		}
	}

	dialogActionToggle = (data) => {
		if(!data)data = false;
		return () => {
			this.setState({
				action: {
					open: !this.state.action.open,
					data: data
				}
			});
		}
	}

	render() {
		const items = this.props.groups.map((group, groupIndex) => {
    		const children = this.props.actions.filter((action, actionIndex) => {
		    	return action.group*1 === groupIndex*1;
		    }).map((action, actionIndex) => <MenuItem key={actionIndex} onTouchTap={this.dialogActionToggle(action)} leftIcon={<FontIcon className="material-icons">photo_camera</FontIcon>}>{action.name}</MenuItem>)

		    children.push(<MenuItem key={children.length+1} onTouchTap={this.dialogActionToggle()} leftIcon={<FontIcon className="material-icons">add</FontIcon>}>新增動作</MenuItem>);

		    const rightIcon = <IconButton>
		    	<FontIcon className="material-icons" onTouchTap={this.dialogGroupToggle(group)}>mode_edit</FontIcon>
		    </IconButton>

	    	return <div key={groupIndex}>
		    	<ListItem 
				    key={groupIndex} 
				    primaryText={group.name}
				    nestedItems={children}
				    primaryTogglesNestedList={true}
				    leftIcon={<FontIcon className="material-icons">view_module</FontIcon>}
				    rightIconButton={rightIcon}
				/>
				<Divider />
			</div>
	    });

	    return (
	    	<div className="TopBar">
		      	<AppBar
			    	title="POSE"
			    	iconClassNameRight="material-icons muidocs-icon-navigation-expand-more"
			    	onLeftIconButtonTouchTap={this.handleToggle}
			  	/>
			  	<Drawer
			  		docked={false}
			    	width={200}
			    	open={this.state.open}
			    	onRequestChange={(open) => this.setState({open})}
			  	>
			    	<List>{items}</List>
			    	<MenuItem onTouchTap={this.dialogGroupToggle()} leftIcon={<FontIcon className="material-icons">add</FontIcon>}>新增群組</MenuItem>
			  	</Drawer>
			  	<PoseDialogs
			  		dialogGroup={this.state.group}
			  		closeGroup={this.dialogGroupClose}
			  		dialogAction={this.state.action}
			  		closeAction={this.dialogActionClose}
			  	>
			  	</PoseDialogs>
		  	</div>
	    );
	}
};

export default TopBar;