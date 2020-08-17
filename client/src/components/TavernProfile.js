import React, { Component } from 'react';
import '../css/TavernProfile.css';
import Header from './Header';


class TavernProfile extends Component {
    constructor(props) {
        super(props);

        this.handleConfigureProfile = this.handleConfigureProfile.bind(this);
    }

    handleConfigureProfile = async event => {
        window.location.href = "/configure/tavern";
    }

    render() {
        return (
            <div className="profile">
                <Header />
                <div className="container" id="tavernProfile">
                    <h2> Your profile: Tavern </h2>
                    <button type="button" onClick={this.handleConfigureProfile} className="btn btn-success"> Configure profile </button>
                </div>
            </div>
        );
    }
}

export default TavernProfile;