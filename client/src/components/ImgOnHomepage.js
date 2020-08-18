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
				<div id="homePage">
					<div className="btnBox">
						<button className="button"><a href="/login"><span>Log in</span></a></button>
						<br/>
						<button className="button"><a href="/register"> <span>Register</span></a></button>
						<br/>
						<button className="button" onClick={this.getAdsFromDatabase}><span>Show ads</span></button>
					{/* <button className="btnShowAds"> <a href="/ShowForum"> Show ads </a></button> */}
					</div>
					<img src="/backgrounds/background.jpeg" alt="image_header"/>
				</div>

				{/*<div className="container" id="allAds" display="none">
					<div>
						{this.state.listResult}
					</div>
				</div>
				*/}
			</div>
		);
	}
}

export default ImgOnHomepage;