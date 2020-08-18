import React, { Component } from 'react';
import '../css/ImgOnHomepage.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import ListResult from './ListResult';
import Header from './Header';
import Footer from './Footer';
import CheckInstruments from './CheckInstruments';
import CheckGenres from './CheckGenres';
import CheckLocation from './CheckLocation';
import '../css/FindMBV.css';


class ImgOnHomepage extends Component {
  
	constructor(props) {
		super(props);
		this.state = {
			flag: false,
			result: [],
			listResult: null
		};

		this.getAdsFromDatabase = this.getAdsFromDatabase.bind(this);
	}

	async getAdsFromDatabase(event) {
		{
			await axios.get('http://localhost:5000/api/forum/getAllAds', {
				params: {
					accountType: localStorage.accountType
				}
			}).then(res => {
				console.log(localStorage.accountType)
				this.state.result = res.data;
				console.log(this.state.result);
				this.state.listResult = this.state.result.map(
					result => <ListResult
						// id={result.id}
						// key={result.id}
						name={result.title}
						description={result.description}
						email={result.user}
						genre={result.genres}
						instruments={result.instruments}
					// location={result.location}
					/>);
			})
		}

		document.getElementById("homePage").style.display = "none";
		document.getElementById("allAds").style.display = "block";
		this.forceUpdate();
	}


	render(){

		return (
			<div className="ImgOnHomepage">
				<div id="homePage" display="block">
					<img src="/backgrounds/background.jpeg" alt="image_header"/>
					<button className="btnLogIn"><a href="/login"> <span className="textBtn">Log in</span> </a></button>
					<button className="btnSignIn"> <a href="/register"> Register </a></button>
					<button className="btnShowAds" onClick={this.getAdsFromDatabase}> Show ads </button>
					{/* <button className="btnShowAds"> <a href="/ShowForum"> Show ads </a></button> */}
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