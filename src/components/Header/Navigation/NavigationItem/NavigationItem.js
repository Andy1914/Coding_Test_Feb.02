import React from 'react';
import { Link } from 'react-router-dom';

const NavigationItem = (props) => (
	<li>
		<Link to={props.link} >{props.children}</Link>
	</li>
);

export default NavigationItem;
