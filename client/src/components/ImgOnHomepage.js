import React, { Component } from 'react';
import '../css/ImgOnHomepage.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import ListResult from './ListResult';
import Header from './Header';
import Footer from './Footer';
import SliderComponent from './SliderComponent';



class ImgOnHomepage extends Component {
  
	constructor(props) {
		super(props);
		this.state = {
			flag: false,
			result: [],
			listResult: null
		};
	}

	componentDidMount() {
		if (localStorage.email !== undefined) {
			document.getElementById("loginButton").style.display = "none";
			document.getElementById("registerButton").style.display = "none";
		}
		else {

		}
	}

	render(){

		return (
			<div className="ImgOnHomepage">
				<div id="homePage">
					<SliderComponent />
					<div className="btnBox">
						<button className="button" id="loginButton"><a href="/login"><span>Log in</span></a></button>
						<br/><br/>
						<button className="button" id="registerButton"><a href="/register"> <span>Register</span></a></button>
						<br/><br/>
						<button className="button"><a href="/showAds"><span>Show ads</span></a></button>
					{/* <button className="btnShowAds"> <a href="/ShowForum"> Show ads </a></button> */}
					</div>
					{/* <img src="/backgrounds/background.jpg" alt="image_header"/> */}
				</div>

				<div className="container" id="allAds" display="none">
					<div>
						{this.state.listResult}
					</div>
				</div>
				
			</div>
		);
	}
}

export default ImgOnHomepage;