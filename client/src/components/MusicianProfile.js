import React, { Component } from 'react';
import '../css/MusicianProfile.css';
import Header from './Header';

class MusicianProfile extends Component {
    constructor(props) {
        super(props);

        this.handleSubmitforAccount = this.handleSubmitforAccount.bind(this);
    }

    handleSubmitforAccount = async event => {
        // const forAccount = this.state.forAccount;
        // document.getElementById("").reset();
        window.location.href = "/configure/musician";
    }

    render() {
        return (
            <div className="profile">
                <Header />
                <div className="container" id="musicianAccount">
                    <h2> Your profile: Musician </h2>
                    <button type="button" onClick={this.handleSubmitforAccount} className="btn btn-success"> Configure profile </button>
                </div>
            </div>
        );
    }
}

export default MusicianProfile;