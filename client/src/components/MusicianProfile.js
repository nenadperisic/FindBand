import React, { Component } from 'react';
import '../css/MusicianProfile.css';
import Header from './Header';
import Footer from './Footer';
// import CommentResult from './CommentResult';
// import MusicianData from './MusicianData';
import jsex from './JsonExcercise.json';

import axios from 'axios';

class MusicianProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areThereComments : false,
            dateOfBirth: '',
            genres: [],
            instruments: [],
            location: '',
            description: '',
            professionalAccount: ''
        };

        this.configureProfile = this.configureProfile.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.logout = this.logout.bind(this);
    }


    configureProfile = async event => {
        // const forAccount = this.state.forAccount;
        // document.getElementById("").reset();
        window.location.href = "/configure/musician";
    }

    deleteAccount = async event => {
        // const forAccount = this.state.forAccount;
        if (!localStorage.email) {
            window.alert("You must be logged in if you want to delete account.");
        } else {
            var confirm = window.confirm("Delete your account? If you choose yes, all data from your account will be lost.");
            if (confirm) {
                try {
                    /* await */ axios.post('http://localhost:5000/api/user/profile/deleteAccount', { email: localStorage.email });
                } catch (e) {
                    // console.log(e.response.data.message);
                    window.alert("Error while sending request for delete account!");
                }
                localStorage.clear();
            }
        }
    }

    logout = async event => {
        // const forAccount = this.state.forAccount;
        if (!localStorage.email) {
            window.alert("You are not logged in");
        } else {
            var confirm = window.confirm("Logout from your account?");
            if (confirm) {
                localStorage.clear();
            }
        }
    }

    render() {

        // const commentResult = jsex.map(
        //     result => <CommentResult
        //     id={result.id}
        //     key={result.id}
        //     name={result.name}
        //     description={result.description}
        //     genre={result.genre}
        //     location={result.location}
        //     />);
        
        // commentResult.length > 0 ? this.state.areThereComments = true : this.state.areThereComments = false;    

        const musician = {
            "id": 1,
            "name": "Ime Prezime",
            "dateOfBirth": "25.5.1990.",
            "instruments": ["vocal"],
            "location": "Pancevo",
            "description": "Umetnicka dusa trazi kolege za sviranje. Neozboljni stop.",
            "professionalAccount" : "yes"
        }

        return (
            <div className="profile">
                <Header />
                <div className="container" id="musicianAccount">
                    <p>Polje za ime i prezime osobe</p>
                </div>

                <div id = "buttonConfigure">
                    <button className = "button" type="button" onClick={this.configureProfile} className="btn btn-success"> Configure profile </button>
                </div>

                <div class="dropdown" id = "twoButtons">
                    <button class="dropbtn">Dropdown</button>
                        <div class="dropdown-content">
                            <button type="button" onClick={this.logout} className="btn btn-success"> Logout </button>
                            <button type="button" onClick={this.deleteAccount} className="btn btn-success"> Delete account </button>
                        </div>
                </div>

                <div id = "description">
                    <p>{musician.description}</p>
                    <p>Our location: {musician.location}</p>
                    <p>Instruments: {musician.instruments}</p>
                </div>
                {/* <div className="container" id="commentSection">
                    {this.state.areThereComments ? commentResult: <h1>There are no comments for this user yet.</h1>}
                </div> */}
                <Footer />
            </div>
        );
    }
}

export default MusicianProfile;