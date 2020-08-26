import React, { Component } from 'react';

class MusicianProfileResults extends Component {

    constructor(props){
        super(props);
    }


    render(){
        const style={
            width: "100%",
        };
        
        return(
            <div className = "container" id="listedDetailsMusician" style={style}> 
                <h3 style={{fontWeight: "bold", fontSize: "35px"}}>{this.props.name}</h3>
                <hr />
                <p style={{fontSize: "25px"}}>About:</p>
                <h6>Description: {this.props.description}</h6> 
                <h6>🎂 Brith date: {this.props.dateOfBirth}</h6>
                <h6>🎶 Genres: {this.props.genres}</h6>
                <h6>🎸 Instruments: {this.props.instruments}</h6>
                <h6>📍 Location: {this.props.location}</h6>
                <h6>❓ professional account: {this.props.professionalAccount ? ' ✔️ yes': ' ❌ no'}</h6>
            </div>
        );
    }
}

export default MusicianProfileResults;