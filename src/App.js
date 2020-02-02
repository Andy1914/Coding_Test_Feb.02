import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import HomeContainer from './containers/HomeContainer/HomeContainer';
import { Redirect, Route, Switch } from "react-router";
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Profile from './containers/Profile/Profile';
import './App.css';


class App extends Component {
	state = {
		isLogin: false
	}
	render() {
		// let redirect = '';
		// if (localStorage.getItem('token') === null || localStorage.getItem('token') === "") {
		// 	redirect = <Redirect to='/login' />
		// }
		return (

			<Switch>


				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Layout>
					<Route path="/profile" exact component={Profile} />
					<Route path="/" exact component={HomeContainer} />

				</Layout>


			</Switch>
		);
	}

}

export default App;
