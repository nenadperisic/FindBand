import React, { Component } from 'react';

class ListResult extends Component{

    constructor(props){
        super(props)

        this.viewAd = this.viewAd.bind(this);
    }

    viewAd(id){
        console.log(id);
    }

    render(){
        const style={borderRadius: "25px", 
                borderStyle: "solid", 
                borderColor: "#343a40", 
                height: "40%", 
                margin: "3%",
                backgroundColor: "rgba(4,4,4, 0.7)"
            };
            const styleItems={
                marginLeft: "20px", 
                color: "white"
            };

            const styleButton={
                colorborder: "1px solid rgb(70, 171, 230)",
                marginLeft: "75%", 
                borderRadius: "50%", 
                backgroundColor: "#343a40",
                textAlign: "center"
            };

        return(
            <div style = {style}>
                <div style={{marginTop: "20px"}}>
                    <h2 style={styleItems}>{this.props.name}</h2>
                    <h6 style={styleItems}>Genre: {this.props.genre}</h6>
                    <h6 style={styleItems}>Instruments: {this.props.instruments}</h6>
                    <h5 style={styleItems}>Description: {this.props.description}</h5>
                    <h6 style={styleItems}>Email: {this.props.email}</h6>
                   <button className="button" style={styleButton} onClick={() => this.viewAd(this.props.id)}>
                       <span>View Ad</span>
                    </button>
                </div>

            </div>
        );
    }

}

export default ListResult;