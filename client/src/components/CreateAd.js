import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import CreateAdMusician from './CreateAdMusician';
import CreateAdTavern from './CreateAdTavern';
import CreateAdBand from './CreateAdBand';

class CreateAd extends Component {
    
    
    render() {
        return (
            <div className="createAd">
                <Header />
                {console.log(localStorage.accountType)}
                {localStorage.accountType === undefined ?    window.alert("You must be logged in!") : console.log("You have access!")}
                {localStorage.accountType === "musician" ? <CreateAdMusician />: null}
                {localStorage.accountType === "tavern" ? <CreateAdTavern /> : null}
                {localStorage.accountType === "band" ? <CreateAdBand /> : null}
                
                <Footer />
            </div>
            
        );
    }

}

export default CreateAd;