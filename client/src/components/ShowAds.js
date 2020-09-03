import React, { Component } from 'react';
import axios from 'axios';
import ListResult from './ListResult';
import Header from './Header';
import Footer from './Footer';

class showAds extends Component {
  
	constructor(props) {
		super(props);
		this.state = {
			flag: false,
			result: [],
			listResult: null
		};
	}

	async componentDidMount() {
		// if (localStorage.email !== undefined) {
		// 	document.getElementById("loginButton").style.display = "none";
		// 	document.getElementById("registerButton").style.display = "none";
		// }
		// else {

        // }
        
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
            this.forceUpdate();
	}

	render(){
        const styleList={
            position: "relative",
            width: "70%",
            margin: "auto",
            marginTop: "10%",
            marginBottom: "10%",
        }

		return (
			<div className="showAds">
                <Header />
                <div style={styleList}>
                    {this.state.listResult}
                </div>
                <Footer />
            </div>
				
		);
	}
}

export default showAds;