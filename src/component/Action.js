import React, { Component } from 'react';
import './Action.css';
import FireBaseTools from '../util/firebase';

class Action extends Component {

    constructor() {
        super();
        this.state = {
            name: ""
        };
    }

    componentWillMount() {
        const actionRef = FireBaseTools.getDatabaseReference('actions/' + this.props.id);
        if (actionRef) {
            actionRef.on('value', snap => {
                this.setState(snap.val());
            });
            // actionRef.on('child_changed', snap => {
            //     this.setState(snap.val());
            // });
        }
    }

    render() {
        return ( 
            <div className="Action">
                <h1>{this.state.name}</h1> 
            </div>
        );
    }
}

export default Action;