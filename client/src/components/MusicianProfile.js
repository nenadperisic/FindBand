import React, { Component } from 'react';
import '../css/MusicianProfile.css';
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
        this.deleteAccount = this.deleteAccount.bind(this);
        this.logout = this.logout.bind(this);
    }


    configureProfile = async event => {
        window.location.href = "/configure";
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
                    // key={result.id}
                    name={result.name}
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
            backgroundImage: "url('/backgrounds/grayBlur.jpg')",
            height: "100vh",
            width: "100%",
            backgroundRepeat: "repeat"
        }
        return (
            <div className="profile" style={style}>
                <Header />
                <button type="button" id="configureBtn" onClick={this.configureProfile}> <span>Configure profile </span></button>
                {this.state.listResult}
                <Footer />
            </div>
        );
    }
}

export default MusicianProfile;