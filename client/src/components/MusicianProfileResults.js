import React, { Component } from 'react';

class MusicianProfileResults extends Component {

    constructor(props){
        super(props);
    }


    render(){
        const style={
            width: "100%",
            margin: "auto"
        };
        
        return(
            <div className = "container" id="listedDetailsMusician" style={style}> 
                <img src="/profilePic.webp"style={{height: "50px", width: "50px"}}/>
                <h1 style={{fontWeight: "bold", fontSize: "35px"}}>{this.props.name}</h1>
                <hr />
                <p style={{fontSize: "25px"}}>About:</p>
                <h5>📝 <b>Description:</b> {this.props.description}</h5> 
                <h5>🎂 <b>Brith date:</b> {this.props.dateOfBirth}</h5>
                <h5>🎶 <b>Genres:</b> {this.props.genres}</h5>
                <h5>🎸 <b>Instruments:</b> {this.props.instruments}</h5>
                <h5>📍 <b>Location:</b> {this.props.location}</h5>
                <h5>❓ <b>Professional account:</b> {this.props.professionalAccount ? ' ✔️ yes': ' ❌ no'}</h5>
            </div>
        );
    }
}

export default MusicianProfileResults;