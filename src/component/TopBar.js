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
import Divider from 'material-ui/Divider';
import FireBaseTools from '../util/firebase';
import SystemMenu from './SystemMenu';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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

	dialogGroupToggle = (data, key) => {
		if(!data)data = false;
		return () => {
			this.setState({
				group: {
					open: !this.state.group.open,
					data: data,
					key: key
				}
			});
		}
	}

	dialogActionToggle = (data, key, groupKey) => {
		if(!data)data = false;
		return () => {
			this.setState({
				action: {
					open: !this.state.action.open,
					data: data,
					key: key,
					group: groupKey
				}
			});
		}
	}

	saveGroupName = (key, data) => () => {
        const ref = FireBaseTools.getDatabaseReference('/actionGroups/' + key);
        if (ref) {
            ref.update({'name': data.name}, () => {
            	this.dialogGroupClose();
            	console.log('update group name', data.name);
            });
        }
    }

    saveNewGroup = (data) => () => {
    	if(!data || !data.name)return;
    	const newGroupRef = FireBaseTools.getDatabaseReference('/actionGroups').push();
    	newGroupRef.set(data, () => {
    		this.dialogGroupClose();
            console.log('save new group ', newGroupRef.key, data);
    	});
    }

    saveActionName = (key, data) => () => {
        const ref = FireBaseTools.getDatabaseReference('/actions/' + key);
        if (ref) {
            ref.update({'name': data.name}, () => {
            	this.dialogActionClose();
            	console.log('update action name', data.name);
            });
        }
    }

    saveNewAction = (data) => () => {
    	if(!data || !data.name || !data.group)return;
    	const newRef = FireBaseTools.getDatabaseReference('/actions').push();
    	newRef.set(data, () => {
    		this.dialogActionClose();
            console.log('save new action ', newRef.key, data);
    	});
    }

    deleteAction = (key) => () => {
        const ref = FireBaseTools.getDatabaseReference('/actions/' + key);
        if (ref) {
            ref.remove()
            .then(() => {
            	this.dialogActionClose();
            	console.log('delete action ', key);
            });
        }
    }

    deleteGroup = (key) => () => {
        const ref = FireBaseTools.getDatabaseReference('/actionGroups/' + key);
        if (ref) {
            ref.remove()
            .then(() => {
            	this.dialogGroupClose();
            	console.log('delete group ', key);
            });
        }
    }

    groupsMoveIndex = (groups, oldIndex, newIndex) => (e) => {
    	let newValues = {};

    	Object.keys(groups).forEach(key => {
    		const group = groups[key];
    		if(group.index === oldIndex){
    			newValues[key] = {
    				...group,
    				index: newIndex
    			}
    		}else if(group.index === newIndex){
    			newValues[key] = {
    				...group,
    				index: oldIndex
    			}
    		}

    	})

    	const ref = FireBaseTools.getDatabaseReference('/actionGroups');
    	ref.update(newValues)
    	.then(() => console.log('newValues', newValues));
    }

	render() {
		const groups = this.props.groups;
		const actions = this.props.actions;
		const groups_length = Object.keys(groups).length;
		const items = Object.keys(groups)
			.sort((a, b) => groups[a].index -groups[b].index)
			.map((groupKey, groupIndex) => {
				let group = groups[groupKey];
	    		const children = Object.keys(actions).filter((actionKey, actionIndex) => {
	    			let action = actions[actionKey];
			    	return action.group === groupKey;
			    }).map((actionKey, actionIndex) => {
			    	let action = actions[actionKey];
			    	return <MenuItem key={actionIndex} onTouchTap={this.dialogActionToggle(action, actionKey, groupKey)} leftIcon={<FontIcon className="material-icons">photo_camera</FontIcon>}>{action.name}</MenuItem>
			    });

			    children.push(<MenuItem key={children.length+1} onTouchTap={this.dialogActionToggle(false, false, groupKey)} leftIcon={<FontIcon className="material-icons">add</FontIcon>}>新增動作</MenuItem>);

			    const RightMenu = <IconMenu
	                iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
	                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
	                targetOrigin={{horizontal: 'right', vertical: 'top'}}
	            >
	                <MenuItem primaryText="編輯" onClick={this.dialogGroupToggle(group, groupKey)}/>
	                {groupIndex !== 0 && <MenuItem primaryText="上移" onClick={this.groupsMoveIndex(groups, group.index, group.index-1)}/>}
	                {groupIndex !== groups_length-1 && <MenuItem primaryText="下移" onClick={this.groupsMoveIndex(groups, group.index, group.index+1)}/>}
	            </IconMenu>

		    	return <div key={groupIndex}>
			    	<ListItem 
					    key={groupIndex} 
					    primaryText={group.name}
					    nestedItems={children}
					    primaryTogglesNestedList={true}
					    leftIcon={<FontIcon className="material-icons">view_module</FontIcon>}
					    rightIconButton={RightMenu}
					/>
					<Divider />
				</div>
		    });

	    const AppBarRightIcon = <IconButton>
		    <FontIcon className="material-icons" onTouchTap={this.handleToggle}>mode_edit</FontIcon>
		</IconButton>

	    return (
	    	<div className="TopBar">
		      	<AppBar
		      		className="TopBar-app-bar"
			    	title="posing"
			    	iconElementLeft={<SystemMenu admin={this.props.admin}/>}
			    	iconElementRight={this.props.admin ? AppBarRightIcon : null}
			    	style={{
			    		backgroundColor: 'black'
			    	}}
			  	/>
			  	<Drawer
			  		docked={false}
			    	width={'70%'}
			    	open={this.state.open}
			    	onRequestChange={(open) => this.setState({open})}
			  	>
			    	<List>{items}</List>
			    	<MenuItem onTouchTap={this.dialogGroupToggle(false, groups_length+1)} leftIcon={<FontIcon className="material-icons">add</FontIcon>}>新增群組</MenuItem>
			  	</Drawer>
			  	<PoseDialogs
			  		dialogGroup={this.state.group}
			  		closeGroup={this.dialogGroupClose}
			  		saveGroupName={this.saveGroupName}
			  		saveNewGroup={this.saveNewGroup}
			  		dialogAction={this.state.action}
			  		closeAction={this.dialogActionClose}
			  		saveActionName={this.saveActionName}
			  		saveNewAction={this.saveNewAction}
			  		deleteAction={this.deleteAction}
			  		deleteGroup={this.deleteGroup}
			  	>
			  	</PoseDialogs>
		  	</div>
	    );
	}
};

export default TopBar;