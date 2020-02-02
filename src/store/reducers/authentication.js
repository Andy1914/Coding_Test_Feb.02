import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';
const initialState = {
	autheneticationStatus: null,
	autheneticate: false,
	registerStatusSuccess: null,
	registerStatusFalid: null,
	userDetail: null,

}

const loginSuccess = (state, action) => {
	return updateObject(state, {
		userDetail: action.payload,
		autheneticate: true,

	});
};
const loginFaild = (state, action) => {
	return updateObject(state, {
		autheneticationStatus: action.payload,
	});
}
const registerSuccess = (state, action) => {
	return updateObject(state, {
		registerStatusSuccess: action.payload,
		registerStatusFalid: null
	})
}
const registerFaild = (state, action) => {
	return updateObject(state, {
		registerStatusFalid: action.payload,
		registerStatusSuccess: null
	})
}
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN_SUCCESS:
			return loginSuccess(state, action);
		case actionTypes.LOGIN_FAILD:
			return loginFaild(state, action);
		case actionTypes.REGISTER_SUCCESS:
			return registerSuccess(state, action)
		case actionTypes.REGISTER_FAILD:
			return registerFaild(state, action)
		default:
			return state;
	}

}

export default reducer
