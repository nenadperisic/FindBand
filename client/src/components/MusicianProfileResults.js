import React, { Component } from 'react';

class MusicianProfileResults extends Component {

    constructor(props){
        super(props);
    }


    render(){
        const style={
                position: "relative",
                borderRadius: "25px", 
                borderStyle: "solid", 
                borderColor: "#343a40", 
                width: "40%",
                padding: "3%",
                backgroundColor: "rgba(129, 187, 152, 0.7)"
            };
        return(
            <div className = "container" id="listedDetailsMusician" style = {style}> 
                <h6>Name: {this.props.name}</h6>
                <h6>Date of birth: {this.props.dateOfBirth}</h6>
                <h6>Genres: {this.props.genres}</h6>
                <h6>Instruments: {this.props.instruments}</h6>
                <h6>Location: {this.props.location}</h6>
                <h6>Description: {this.props.description}</h6> 
                <h6>professional account: {this.props.professionalAccount ? 'yes': 'no'}</h6>
            </div>
        );
    }
}

export default MusicianProfileResults;