import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

class MusicianProfileResults extends Component {
    render(){
        return(
            <Container >
                <div className="row">
                    <div className = "col-md-7">
                        <div id="profile-img">
                            <img src="/profilePicMale.webp" alt = "profile"style={{height: "15%", width: "20%"}}/>
                            <br/>
                            <div className="file btn btn-lg" id="fileDiv">
                                Change photo
                                <input type="file" name="file"></input>
                            </div>
                        </div> 
                    </div>
                    <div className="profile-head">
                        <h2>{this.props.name}</h2>
                        <hr/>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="about-tab" data-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected="false">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="details-tab" data-toggle="tab" href="#details" role="tab" aria-controls="details" aria-selected="true">Details</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="tab-content about-tab" id="myTabContent">
                            <div className="tab-pane fade" id="about" role="tabpanel" aria-labelledby="about-tab">
                                <div className="col-md-6">
                                    <label>{this.props.description}</label>
                                </div>
                            </div>
                            <div className="tab-pane fade show active" id="details" role="tabpanel" aria-labelledby="details-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label><span role="img" aria-label="acceessible-emoji">🎂</span> Brith date: </label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{this.props.dateOfBirth}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label><span role="img" aria-label="acceessible-emoji">🎶</span> Genres: </label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{this.props.genres}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label><span role="img" aria-label="acceessible-emoji">🎸 </span> Instruments: </label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{this.props.instruments}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label><span role="img" aria-label="acceessible-emoji">📍</span> Location: </label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{this.props.location}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label><span role="img" aria-label="acceessible-emoji">❓</span> Professional account: </label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{this.props.professionalAccount ? ' ✔️ yes': ' ❌ no'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
        );
    }
}

export default MusicianProfileResults;