import React, { Component } from 'react';
import './Action.css';
import Paper from 'material-ui/Paper';

class Action extends Component {

    render() {
        return ( 
            <div className="Action">
                <Paper zDepth={1}>
                    <div className="Action__name">
                        {this.props.name}
                    </div>
                </Paper>
            </div>
        );
    }
}

export default Action;