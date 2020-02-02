import React, { Component } from 'react';
import './HomeContainer.css';
import Holder from '../../hoc/Holder';
import BannerImg from '../../assets/images/banner-img.jpeg';



class HomeContainer extends Component {
	render() {
		return (
			<Holder>
				<div className="banner-section">
					<img src={BannerImg} alt="banner" />
				</div>
				<div className="content-section">
					<div className="container">
						<h2>About Us</h2>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu</p>
						<ul>
							<li>Lorem Ipsum is simply dummy text.</li>
							<li>Lorem Ipsum is simply dummy text.</li>
							<li>Lorem Ipsum is simply dummy text.</li>
							<li>Lorem Ipsum is simply dummy text.</li>
						</ul>
					</div>
				</div>
			</Holder>
		);
	}
}

export default HomeContainer;
