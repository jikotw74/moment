import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TopBar from './TopBar';
import ActionGroupList from './ActionGroupList';

const Main = () => (
	<div className="Main">
  		<TopBar />
  		<ActionGroupList/>
  		<RaisedButton label="Go" />
  	</div>
);

export default Main;