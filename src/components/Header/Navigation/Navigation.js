
import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem.js';

const Navigation = (props) => (
	<div className="navigation">
		<ul>
			<NavigationItem link="/">Home</NavigationItem>
			<NavigationItem link="/login">Sign In/Sign Up</NavigationItem>
		</ul>
	</div>
);

export default Navigation;
