import React from 'react';
import './Header.css';
import Navigation from './Navigation/Navigation.js'

const Header = () => (
	<header>
		<div className="flex space-between items-align-center">
			<h3>Test Project</h3>
			<Navigation></Navigation>
		</div>
	</header>
);

export default Header;
