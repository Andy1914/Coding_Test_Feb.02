import React, { Component } from 'react';
import './Layout.css';
import Header from './../../components/Header/Header.js';

class Layout extends Component {

	render() {
		let copyRightYear = new Date().getFullYear()
		return (
			<div>
				<Header></Header>
				<main>
					{this.props.children}
				</main>
				<footer>
					<p>&#9400; {copyRightYear} Test Project. All Rights Reserved. </p>
				</footer>
			</div>
		)
	}
}

export default Layout;
