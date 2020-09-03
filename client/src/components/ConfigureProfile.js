import React, { Component } from 'react';
import ConfigureMusicianProfile from './ConfigureMusicianProfile';
import ConfigureBandProfile from './ConfigureBandProfile';
import ConfigureTavernProfile from './ConfigureTavernProfile';

class ConfigureProfile extends Component {
    render() {
        return (
            <div className="configure-profile">
                {console.log(localStorage.accountType)}
                {localStorage.accountType === undefined ? window.alert("You must be logged in!") : console.log("You have access!")}
                {localStorage.accountType === "musician" ? <ConfigureMusicianProfile /> : null}
                {localStorage.accountType === "band" ? <ConfigureBandProfile /> : null}
                {localStorage.accountType === "tavern" ? <ConfigureTavernProfile /> : null}
            </div>
        );
    }
}

export default ConfigureProfile;