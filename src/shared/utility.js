export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties
	};
};

export const checkValidity = (value, rules) => {
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
	})
	return isvalid;
}


