import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


class PoseDialogs extends Component {

    changeName = (data) => (event, newValue) => data.name = newValue;

    render() {
        let groupActions = [];
        let actionActions = [];
        let dialogGroupChildren, dialogActionChildren;
        let groupTitle = 'Group';
        let actionTitle = 'Action';

        let groupData = this.props.dialogGroup.data;
        let groupKey = this.props.dialogGroup.key;
        if(groupData){
            dialogGroupChildren = <TextField
              defaultValue={groupData.name}
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
                    label="刪除"
                    secondary={true}
                    onTouchTap={this.props.deleteGroup(groupKey)}
                />,
                <FlatButton
                    label="儲存"
                    primary={true}
                    onTouchTap={this.props.saveGroupName(groupKey, groupData)}
                />,
            ];
        }else{
            groupData = {name: "", index: groupKey};
            dialogGroupChildren = <TextField
              defaultValue={groupData.name}
              floatingLabelText="名稱"
              onChange={this.changeName(groupData)}
            />
            groupTitle = "新增群組";
            groupActions = [
                <FlatButton
                    label="取消"
                    onTouchTap={this.props.closeGroup}
                />,
                <FlatButton
                    label="完成"
                    primary={true}
                    onTouchTap={this.props.saveNewGroup(groupData)}
                />,
            ];
        }

        let actionData = this.props.dialogAction.data;
        let actionKey = this.props.dialogAction.key;
        let actionGroupKey = this.props.dialogAction.group;
        if(actionData){
            dialogActionChildren = <TextField
              defaultValue={actionData.name}
              floatingLabelText="名稱"
              onChange={this.changeName(actionData)}
            />

            actionTitle = "編輯動作";
            actionActions = [
                <FlatButton
                    label="取消"
                    onTouchTap={this.props.closeAction}
                />,
                <FlatButton
                    label="刪除"
                    secondary={true}
                    onTouchTap={this.props.deleteAction(actionKey)}
                />,
                <FlatButton
                    label="儲存"
                    primary={true}
                    onTouchTap={this.props.saveActionName(actionKey, actionData)}
                />,
            ];
        }else{
            actionData = {
                name: "",
                group: actionGroupKey
            };
            
            dialogActionChildren = <TextField
              defaultValue={actionData.name}
              floatingLabelText="名稱"
              onChange={this.changeName(actionData)}
            />
            actionTitle = "新增群組";
            actionActions = [
                <FlatButton
                    label="取消"
                    onTouchTap={this.props.closeAction}
                />,
                <FlatButton
                    label="完成"
                    primary={true}
                    onTouchTap={this.props.saveNewAction(actionData)}
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