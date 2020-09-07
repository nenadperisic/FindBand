import React, { Component } from 'react';
import '../css/ImgOnHomepage.css';
// import { Link } from 'react-router-dom';
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
				</div>
			</div>
		);
	}
}

export default ImgOnHomepage;