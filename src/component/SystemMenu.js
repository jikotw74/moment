import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FireBaseTools from '../util/firebase';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

class ConfirmDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: false,
            usersEditCopy: false,
        };
    }

    componentWillMount() {
        const ref = FireBaseTools.getDatabaseReference('/userSettings').orderByChild('d');
        if (ref) {
            ref.on('value', snap => {
                this.setState({
                    loading: false,
                    usersSnap: snap,
                    usersEditCopy: snap.val()
                });
            });
        }
    }

    handleCancel = event => {
        this.setState({
            usersEditCopy: this.state.usersSnap.val()
        }, () => this.props.handleClose(event))
    }

    handleSave = event => {
        const ref = FireBaseTools.getDatabaseReference('/userSettings');
        if (ref) {
            ref.update(this.state.usersEditCopy)
            .then(() => console.log('save confirmed users'))
            .then(() => this.props.handleClose(event));
        }
    }

    render() {
        if(this.state.loading){
            return <div/>
        }

        let actions = [
            <FlatButton
                label="取消"
                onTouchTap={this.handleCancel}
            />,
            <FlatButton
                label="儲存"
                primary={true}
                onTouchTap={this.handleSave}
            />,
        ];

        const items = Object.keys(this.state.usersEditCopy)
        .filter(key => {
            return !this.state.usersEditCopy[key].admin
        })
        .map(key => {
            const user = this.state.usersEditCopy[key];
            const ckb = <Checkbox 
                checked={user.confirmed}
                onCheck={(event, isInputChecked) => {
                    user.confirmed = isInputChecked;
                    this.setState({
                        usersEditCopy: this.state.usersEditCopy
                    });
                }}
            />

            return <ListItem key={key} primaryText={user.email} leftCheckbox={ckb} />
        });
        return ( 
            <div>
                <Dialog
                    title={'審核使用者'}
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    autoScrollBodyContent={true}
                >
                    <List>
                        {items}
                    </List>
                </Dialog>
            </div>
        );
    }
}


class SystemMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openConfirmDialog: false
        };
    }

    logout = () => {
        FireBaseTools.logoutUser()
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return ( 
            <div>
                <IconMenu
                    iconButtonElement={<IconButton iconStyle={{color: 'white'}}><MoreVertIcon/></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                    {this.props.admin && <MenuItem primaryText="審核使用者" onClick={(e) => this.setState({openConfirmDialog: true})}/>}
                    <MenuItem primaryText="登出" onClick={(e) => this.logout()}/>
                </IconMenu>
                <ConfirmDialog 
                    open={this.state.openConfirmDialog}
                    handleClose={e => this.setState({openConfirmDialog: false})}
                />
            </div>
        );
    }
}

export default SystemMenu;