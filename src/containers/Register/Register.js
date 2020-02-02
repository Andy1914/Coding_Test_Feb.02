import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions';
import { connect } from "react-redux";
import LoginBg from "../../assets/images/login-bg.jpg";
var divStyle = {
	backgroundImage: 'url(' + LoginBg + ')',
};

class Register extends Component {
	state = {
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
		fullNameError: '',
		emailError: '',
		passwordError: '',
		confirmPasswordError: '',
	}
	validateCheck = [
		{
			field: 'fullName',
			rules: [
				{ type: 'required', message: 'This field is required.' }
			]
		},
		{
			field: 'email',
			rules: [
				{ type: 'required', message: 'This field is required.' },
				{ type: 'isEmail', message: 'Enter a valid email address.' }
			]
		},
		{
			field: 'password',
			rules: [
				{ type: 'required', message: 'This field is required.' },
				{ type: 'minLength', message: 'This password is too short. It must contain at least 8 characters.', length: 8 },
			]
		},
		{
			field: 'confirmPassword',
			rules: [
				{ type: 'matchWithPassword', message: "Passwords don't match" },
				{ type: 'required', message: 'This field is required.' },
			]
		},

	];
	checkField = (...para) => {
		let that = this
		this.validateCheck.forEach(field => {
			let value = that.state[field['field']]
			let isvalid = that.checkValidity(value, field['rules'])
			para.map(test => {
				if (isvalid != null) {
					if (field['field'] == test) {
						this.setState({
							[`${test}Error`]: isvalid.error,
						})
					}
				}
			})
		});
	}
	checkValidity = (value, rules) => {
		let isvalid = null;
		rules.forEach(rule => {
			if (rule['type'] == 'required') {
				if (value.length == 0) {
					isvalid = { 'error': rule['message'] }
				}
			}
			if (rule['type'] == 'isEmail') {
				if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) == false) {
					isvalid = { 'error': rule['message'] }
				}
			}
			if (rule['type'] == 'minLength') {
				if (value.length < rule['length']) {
					isvalid = { 'error': rule['message'] }
				}
			}
			if (rule['type'] == 'matchWithPassword') {
				if (value != this.state.password) {
					isvalid = { 'error': rule['message'] }
				}
			}
		})
		return isvalid;
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
		const userData = {
			email: this.state.email,
			name: this.state.fullName,
			password: this.state.password,
			password_confirm: this.state.confirmPassword,
		}
		this.checkField('email', 'fullName', 'password', 'confirmPassword');

		const { fullNameError, emailError, passwordError, confirmPasswordError } = this.state;
		if (fullNameError == null, emailError == null, passwordError == null, confirmPasswordError == null) {
			this.props.registerHendeler(userData)
		}

	}
	render() {
		return (
			<div className="login-layout flex space-center items-align-center" style={divStyle}>
				<div className="colmn-form">
					<h2>Register</h2>
					{this.props.statusFaild ? <div className="form-error"><p>{this.props.statusFaild}</p></div> : ''}
					{this.props.statusSuccess ? <div className="form-success"><p>{this.props.statusSuccess}</p></div> : ''}
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="form-group">
							<input type="text" name="fullName" onBlur={this.blurHendler} value={this.state.fullName} placeholder="Full Name" onChange={this.changeHendler} className="form-control" />
							{this.state.fullNameError ? <div className="error-input"><p>{this.state.fullNameError}</p></div> : ''}
						</div>
						<div className="form-group">
							<input type="text" name="email" onBlur={this.blurHendler} value={this.state.email} placeholder="Email" onChange={this.changeHendler} className="form-control" />
							{this.state.emailError ? <div className="error-input"><p>{this.state.emailError}</p></div> : ''}
						</div>
						<div className="form-group">
							<input type="password" name="password" onBlur={this.blurHendler} value={this.state.password} placeholder="Password" onChange={this.changeHendler} className="form-control" />
							{this.state.passwordError ? <div className="error-input"><p>{this.state.passwordError}</p></div> : ''}
						</div>
						<div className="form-group">
							<input type="password" name="confirmPassword" onBlur={this.blurHendler} value={this.state.confirmPassword} placeholder="Confirm Password" onChange={this.changeHendler} className="form-control" />
							{this.state.confirmPasswordError ? <div className="error-input"><p>{this.state.confirmPasswordError}</p></div> : ''}
						</div>
						<div className="form-group">
							<button type="submit" className="btn">Sumbit</button>
						</div>
					</form>
					<ul>
						<li><Link to="/">Back To Home</Link></li>
						<li><Link to="/login">Back To Login</Link></li>

					</ul>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		statusFaild: state.authentication.registerStatusFalid,
		statusSuccess: state.authentication.registerStatusSuccess,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		registerHendeler: (reristerData) => dispatch(actions.Register(reristerData))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
