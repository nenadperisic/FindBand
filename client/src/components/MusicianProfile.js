import React, { Component } from 'react';
import '../css/MusicianProfile.css';
import Header from './Header';
import Footer from './Footer';
import CommentResult from './CommentResult';
// import MusicianData from './MusicianData';
import jsex from './JsonExcercise.json';


class MusicianProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areThereComments : false
        };

        this.handleSubmitforAccount = this.handleSubmitforAccount.bind(this);
    }

    handleSubmitforAccount = async event => {
        // const forAccount = this.state.forAccount;
        // document.getElementById("").reset();
        window.location.href = "/configure/musician";
    }

    render() {

        const commentResult = jsex.map(
            result => <CommentResult
            id={result.id}
            key={result.id}
            name={result.name}
            description={result.description}
            genre={result.genre}
            location={result.location}
            />);
        
        commentResult.length > 0 ? this.state.areThereComments = true : this.state.areThereComments = false;    

        return (
            <div className="profile">
                <Header />
                <div className="container" id="musicianAccount">
                    <h2> Your profile: Musician </h2>
                    <button type="button" onClick={this.handleSubmitforAccount} className="btn btn-success"> Configure profile </button>
                    {/* {musicianData} */}
                </div>
                <div className="container" id="commentSection">
                    {this.state.areThereComments ? commentResult: <h1>There are no comments for this user.</h1>}
                </div>
                <Footer />
            </div>
        );
    }
}

export default MusicianProfile;