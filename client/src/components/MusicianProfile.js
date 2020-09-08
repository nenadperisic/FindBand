import React, { Component } from 'react';
import '../css/Profiles.css';
import Header from './Header';
import Footer from './Footer';
import MusicianProfileResults from './MusicianProfileResults';
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
            result: []
        };

        this.configureProfile = this.configureProfile.bind(this);
    }


    configureProfile = async event => {
        window.location.href = "/configure";
    }

    async componentDidMount(){
    
        await axios.post('http://localhost:5000/api/user/profile/musician', {
            email: localStorage.email
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
                <div>
                    <button type="button" id="configureBtn" onClick={this.configureProfile}> <span>Configure profile </span></button>
                    <br/>
                    <button className="button" id="configureBtn"><a href="/MyAds"><span>Show my ads</span></a></button>

                    {this.state.listResult}
                </div>
                <Footer />
            </div>
        );
    }
}

export default MusicianProfile;