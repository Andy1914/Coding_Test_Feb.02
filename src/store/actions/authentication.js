import axios from 'axios';
import * as actionTypes from './actionTypes';

export const loginSuccess = (status) => {
	return {
		type: actionTypes.LOGIN_SUCCESS,
		payload: status
	};
};
export const loginFaild = (status) => {
	return {
		type: actionTypes.LOGIN_FAILD,
		payload: status
	};
};
export const registerSuccess = (status) => {
	return {
		type: actionTypes.REGISTER_SUCCESS,
		payload: status
	}
}
export const registerFaild = (status) => {
	return {
		type: actionTypes.REGISTER_FAILD,
		payload: status
	}
}

export const loginUser = (username, password) => {
	return dispatch => {
		axios.post('http://34.230.181.212:8000/api/v1/login/ ', { 'email': username, 'password': password })
			.then(response => {
				dispatch(loginSuccess(response.data));
				console.log(response)
				localStorage.setItem('token', response.data.data[0].access);
			})
			.catch(error => {
				dispatch(loginFaild(error.response.data.message));
				console.log(error.response)
			})
	}
};

export const Register = (registerData) => dispatch => {
	// const register = registerData
	axios.post('http://34.230.181.212:8000/api/v1/register/', registerData)
		.then(response => {
			dispatch(registerSuccess(response.data.message))
		})
		.catch(error => {
			dispatch(registerFaild(error.response.data.message))
		})
}
