import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FireBaseTools from '../util/firebase';

class SystemMenu extends Component {

    logout = () => {
        FireBaseTools.logoutUser()
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return ( 
            <IconMenu
                iconButtonElement={<IconButton iconStyle={{color: 'white'}}><MoreVertIcon/></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
                <MenuItem primaryText="Sign out" onClick={(e) => this.logout()}/>
            </IconMenu>
        );
    }
}

export default SystemMenu;