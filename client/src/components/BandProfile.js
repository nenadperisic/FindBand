import React, { Component } from 'react';
import '../css/BandProfile.css';
import Header from './Header';


class BandProfile extends Component {
    constructor(props) {
        super(props);

        this.handleConfigureProfile = this.handleConfigureProfile.bind(this);
    }

    handleConfigureProfile = async event => {
        // const forAccount = this.state.forAccount;
        // document.getElementById("").reset();
        window.location.href = "/configure/band";
    }

    render() {
        return (
            <div className="profile">
                <Header />
                <div className="container" id="bandProfile">
                    <h2> Your profile: Band </h2>
                    <button type="button" onClick={this.handleConfigureProfile} className="btn btn-success"> Configure profile </button>
                </div>
            </div>
        );
    }
}

export default BandProfile;