import React, { Component } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { checkValidity } from '../../shared/utility';
import LoginBg from "../../assets/images/login-bg.jpg";
var divStyle = {
	backgroundImage: 'url(' + LoginBg + ')',
};
class Login extends Component {
	state = {
		email: '',
		password: '',
		emailError: '',
		passwordError: '',
	}
	validateCheck = [
		{
			field: 'email',
			rules: [
				{ type: 'isEmail', message: 'Enter a valid email address.' },
				{ type: 'required', message: 'This field is required' }

			]
		},
		{
			field: 'password',
			rules: [
				{ type: 'required', message: 'This field is required' },
				{ type: 'minLength', message: 'This password is too short. It must contain at least 8 characters.', length: 8 }
			]
		}

	]
	checkField = (...para) => {
		let that = this
		this.validateCheck.forEach(field => {
			let value = that.state[field['field']]
			let isvalid = checkValidity(value, field['rules'])
			para.map(test => {
				if (isvalid != null) {
					if (field['field'] === test) {
						this.setState({
							[`${test}Error`]: isvalid.error,
						})
					}
				}
			})
		});
	}
	changeHendler = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
			[e.target.name + 'Error']: null,
		})
	}
	blurHendler = (e) => {
		this.checkField(e.target.name)
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const { email, password, usernameError, passwordError } = this.state;
		this.checkField('email', 'password')
		if (usernameError == null && passwordError == null) {
			this.props.userAuth(email, password)
		}
	}
	render() {
		return (
			<div className="login-layout flex space-center items-align-center" style={divStyle}>
				<div className="colmn-form">
					<h2>Login</h2>
					{this.props.loginStatus ? <p className="form-error">{this.props.loginStatus}</p> : ''}
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="form-group">
							<input type="text" name="email" onBlur={this.blurHendler} value={this.state.email} placeholder="Email" onChange={this.changeHendler} className="form-control" />
							{this.state.emailError ? <div className="error-input"><p>{this.state.emailError}</p></div> : ''}
						</div>
						<div className="form-group">
							<input type="password" name="password" onBlur={this.blurHendler} value={this.state.password} placeholder="password" onChange={this.changeHendler} className="form-control" />
							{this.state.passwordError ? <div className="error-input"><p>{this.state.passwordError}</p></div> : ''}
						</div>
						<div className="form-group">
							<button type="submit" className="btn">Login</button>
						</div>
					</form>
					<ul>
						<li><Link to="/">Back To Home</Link></li>
						<li><Link to="/register">Don't have an account? Sign up</Link></li>
					</ul>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		loginStatus: state.authentication.autheneticationStatus
	}
}
const mapDispatchToProps = dispatch => {
	return {
		userAuth: (username, password) => dispatch(actions.loginUser(username, password))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
