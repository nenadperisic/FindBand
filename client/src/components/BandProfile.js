import React, { Component } from 'react';
import '../css/BandProfile.css';
import Header from './Header';
import Footer from './Footer';
import jsex from './JsonExcercise.json';
import ListBands from './ListBands';

import axios from 'axios';

const band = {
    "id": 4,
    "name": "Banddddd",
    "genre": "Rock",
    "instruments": ["Bass guitar", "vocal", "guitar"],
    "location": "Belgrade",
    "description": "Rock on!",
    "email" : "result4@gmail.com",
    "professionalAccount" : "yes"
}

class MusicianProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruments: [],
            name: '',
            genre: '',
            location: '',
            description: '',
            professionalAccount: '',
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

        return (
            <div>
            <Header />
            <div id="bandAccount">
                <p>{band.name} </p>
            </div>
            <div  id = "buttonConfigure">
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
                <p>{band.description}</p>
                <p>Our location: {band.location}</p>
                <p>Instruments: {band.instruments}</p>
            </div>
            <Footer />
            </div>
        );
    }
}

export default MusicianProfile;