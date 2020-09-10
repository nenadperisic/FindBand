import React, { Component } from 'react';
import '../css/Profiles.css';
import Header from './Header';
import Footer from './Footer';
import MusicianProfileResults from './MusicianProfileResults';
// import ReactStars from "react-rating-stars-component";
import StarRatingComponent from 'react-star-rating-component';
// import CommentResult from './CommentResult';

import axios from 'axios';

class MusicianProfile extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            areThereComments : false,
            name: '',
            dateOfBirth: '',
            genres: [],
            instruments: [],
            location: '',
            description: '',
            professionalAccount: '',
            gender: '',
            listResult: null,
            result: [],
            average: 0
        };

        this.configureProfile = this.configureProfile.bind(this);
    }

    async ratingChanged(newRating) {
        console.log(newRating);
        try {
            const result = await axios.post('http://localhost:5000/api/rating/rate',
                {
                    rating : newRating, 
                    ratedId: localStorage.contactEmail,
                    raterId: localStorage.email
                });
        } catch (error) {
            window.alert("You have already rated this profile.")
        }

        
        window.location.reload(false);
        
    };


    configureProfile = async event => {
        window.location.href = "/configure";
    }

    async componentDidMount(){
        
        await axios.post('http://localhost:5000/api/user/profile/musician', {
            email: localStorage.contactEmail
        }).then(res => {
            console.log(localStorage.email)
            this.state.result = res.data;
            console.log(this.state.result);
            this.state.listResult = this.state.result.map(
                result => <MusicianProfileResults
                    // id={result.id}
                    key={result._id}
                    name={result.name}
                    email={result.email}
                    dateOfBirth={result.dateOfBirth}
                    genres={result.genres}
                    gender={result.gender}
                    instruments={result.instruments}
                    location={result.location}
                    description={result.description}
                    professionalAccount={result.professionalAccount}
                />);
        });

        if(localStorage.email !== localStorage.contactEmail){
            document.getElementById("configureButtons").style.display = "none";
        }else{
            document.getElementById("configureButtons").style.display = "block";
        }

        try {
            const result = await axios.post('http://localhost:5000/api/rating/getRatings',
                {   
                    ratedId: localStorage.contactEmail,
                });
            console.log("Result is: ");
            console.log(result.data.result);
            this.setState({average:result.data.result });

        } catch (error) {
            console.log("getRating failed!")
        }
        console.log("this.average")
        console.log(this.state.average);

        

        this.forceUpdate();
    }


    render() {

        
        const style={
            // backgroundImage: "url('/backgrounds/grayBlur.jpg')",
            height: "100vh",
            width: "100%",
            backgroundRepeat: "repeat"
        }
        return (
            <div className="profile" style={style}>
                <Header />

                <div id="configureButtons">
                    <button type="button" id="configureBtn" onClick={this.configureProfile}> <span>Configure profile </span></button>
                    <br/>
                    <button className="button" id="configureBtn"><a href="/MyAds"><span>Show my ads</span></a></button>
                    
                </div>

                
                

                {this.state.listResult}
                {console.log(this.state.average)}
                

                <div style={{marginLeft: "14%", paddingTop: "1%"}}>
                <StarRatingComponent 
                    name="rate1" 
                    starCount={5}
                    value={this.state.average}
                    onStarClick={this.ratingChanged.bind(this)}
                />
                </div>
                <Footer />
            </div>
        );
    }
}

export default MusicianProfile;