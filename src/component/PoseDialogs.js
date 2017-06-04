import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class PoseDialogs extends Component {

    changeName = (data) => (event) => data.name = event.target.value;

    saveGroup = (data) => () => console.log('saveGroup', data);

    render() {
        let groupActions = [];
        let actionActions = [];
        let dialogGroupChildren, dialogActionChildren;
        let groupTitle = 'Group';
        let actionTitle = 'Action';

        let groupData = this.props.dialogGroup.data;
        if(groupData){
            dialogGroupChildren = <TextField
              value={groupData.name}
              floatingLabelText="名稱"
              onChange={this.changeName(groupData)}
            />

            groupTitle = "編輯群組";
            groupActions = [
                <FlatButton
                    label="取消"
                    onTouchTap={this.props.closeGroup}
                />,
                <FlatButton
                    label="儲存"
                    primary={true}
                    onTouchTap={this.saveGroup(groupData)}
                />,
            ];
        }else{
            dialogGroupChildren = <TextField
              value=""
              floatingLabelText="名稱"
              onChange={this.changeName}
            />
            groupTitle = "新增群組";
            groupActions = [
                <FlatButton
                    label="Cancel"
                    primary={true}
                    onTouchTap={this.props.closeGroup}
                />,
                <FlatButton
                    label="Submit"
                    primary={true}
                    disabled={true}
                    onTouchTap={this.props.closeGroup}
                />,
            ];
        }

        if(this.props.dialogAction.data){
            dialogActionChildren = this.props.dialogAction.data.name;
            actionTitle = "編輯動作";
            actionActions = [
                <FlatButton
                    label="Cancel"
                    primary={true}
                    onTouchTap={this.props.closeAction}
                />,
                <FlatButton
                    label="Submit"
                    primary={true}
                    disabled={true}
                    onTouchTap={this.props.closeAction}
                />,
            ];
        }else{
            dialogActionChildren = 'Add Action';
            actionTitle = "新增動作";
            actionActions = [
                <FlatButton
                    label="Cancel"
                    primary={true}
                    onTouchTap={this.props.closeAction}
                />,
                <FlatButton
                    label="Submit"
                    primary={true}
                    disabled={true}
                    onTouchTap={this.props.closeAction}
                />,
            ];
        }

        return ( 
            <div>
                <Dialog
                    title={groupTitle}
                    actions={groupActions}
                    modal={true}
                    open={this.props.dialogGroup.open}
                >
                    {dialogGroupChildren}
                </Dialog>
                <Dialog
                    title={actionTitle}
                    actions={actionActions}
                    modal={true}
                    open={this.props.dialogAction.open}
                >
                    {dialogActionChildren}
                </Dialog>
            </div>
        );
    }
}

export default PoseDialogs;