import axios from 'axios'
let token = null
// if (localStorage != undefined) {
// 	// token = localStorage.getItem('token')
// }
let header = {}
if (typeof window !== 'undefined') {
	token = localStorage.getItem('token')
	if (token != "" && token != null)
		header = { 'Authorization': 'Bearer ' + token }
} else {
	console.log('we are running on the server');
}
const instance = axios.create({
	baseURL: 'http://34.230.181.212:8000/api/v1/',
	// baseURL: 'https://d1k488ufb4l6gp.cloudfront.net/api/v1/',
	headers: header
});

export default instance;
