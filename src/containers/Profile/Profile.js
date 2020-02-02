import React, { Component } from 'react';
import './Profile.css';
import Holder from '../../hoc/Holder';
import userImg from '../../assets/images/user.jpeg'
import instance from '../../axios-test';

class Profile extends Component {
	state = {
		fullName: '',
		number: '',
		email: '',
		address: '',
		dob: '',
		userDetail: '',
		securityAnswer: '',
		securityQuestion: '',
		imageFile: '',
		imageView: userImg,
		fieldEdit: true
	}
	componentDidMount() {
		instance.get('get-profile/')
			.then(res => {
				console.log(res.data)
				this.setState({
					userDetail: res.data.data[0],
					fullName: res.data.data[0].name,
					email: res.data.data[0].email,
					number: res.data.data[0].phone_no,
					address: res.data.data[0].address,
					imageView: res.data.data[0].image ? res.data.data[0].image : userImg,
					securityAnswer: res.data.security_answer1,
					securityQuestion: res.data.question_list,
				})
			})
	}

	onchangeFile = (e) => {
		let reader = new FileReader();
		let file = e.target.files[0];
		reader.onloadend = () => {
			this.setState({
				imageFile: file,
				imageView: reader.result,

			});
		}
		reader.readAsDataURL(file)


	}
	changeHendler = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}
	submitHendler = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('name', this.state.fullName);
		formData.append('email', this.state.email);
		formData.append('phone_no', this.state.number);
		formData.append('address', this.state.address);
		formData.append('image', this.state.imageFile);
		formData.append('security_answer1', this.state.securityAnswer);

		instance.post('edit-profile/', formData)
			.then(res => {
				console.log(res)
			})
	}
	render() {
		return (

			<Holder>
				<div className="profile-page">
					<div className="container">
						<div className="detail-section">
							<div className="image-view">
								<figure>
									<img src={this.state.imageView} alt="user" />
								</figure>
								<input type="file" className="fileField" disabled={this.state.fieldEdit} onChange={this.onchangeFile} accept="image/x-png,image/gif,image/jpeg" />
							</div>
							<div className="detail-box">
								<h5>Name</h5>
								<div className="form-group">
									<input type="text" name="fullName" disabled={this.state.fieldEdit} value={this.state.fullName} onChange={this.changeHendler} className="form-control" placeholder="Full Name" />
								</div>
							</div>

							<div className="detail-box">
								<h5>Phone Number</h5>
								<div className="form-group">
									<input type="text" name="number" disabled={this.state.fieldEdit} value={this.state.number} onChange={this.changeHendler} className="form-control" placeholder="Number" />
								</div>
							</div>
							<div className="detail-box">
								<h5>Email</h5>
								<div className="form-group">
									<input type="text" name="email" disabled={this.state.fieldEdit} value={this.state.email} onChange={this.changeHendler} className="form-control" placeholder="Email" />
								</div>
							</div>
							<div className="detail-box">
								<h5>Address</h5>
								<div className="form-group">
									<input type="text" name="address" disabled={this.state.fieldEdit} value={this.state.address} onChange={this.changeHendler} className="form-control" placeholder="Address" />
								</div>
							</div>
							<div className="detail-box question-box">
								<div className="selectBox">
									<select disabled={this.state.fieldEdit}>
										{this.state.securityQuestion ? this.state.securityQuestion.map((qus, key) => <option key={key}>{qus}</option>) : ''}
									</select>
								</div>
								<div className="form-group">
									<input type="text" disabled={this.state.fieldEdit} name="securityAnswer" value={this.state.securityAnswer} onChange={this.changeHendler} placeholder="Security Answer" className="form-control" />
								</div>
							</div>
							{this.state.fieldEdit ? <button type="button" className="btn" onClick={() => this.setState({ fieldEdit: false })}>Edit</button> : <button type="button" className="btn" onClick={this.submitHendler}>Save</button>}
						</div>
					</div>
				</div>
			</Holder>
		);
	}
}

export default Profile;
