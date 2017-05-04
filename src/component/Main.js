import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TopBar from './TopBar';
import ActionGroup from './ActionGroup';

const Main = () => (
	<div className="Main">
  		<TopBar />
  		<ActionGroup id="1"/>
  		<RaisedButton label="Default" />
  	</div>
);

export default Main;