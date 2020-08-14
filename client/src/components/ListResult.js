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
        return(
            <div style={{borderRadius: "25px", borderStyle: "solid", borderColor: "#343a40", height: "40%", margin: "3%"}}>
                <div style={{marginTop: "20px"}}>
                    <h2 style={{marginLeft: "20px", color: "white"}}>{this.props.name}</h2>
                    <h6 style={{marginLeft: "40px",color: "#9facc2"}}>Genre: {this.props.genre}</h6>
                    <h6 style={{marginLeft: "40px",color: "#9facc2"}}>Instruments: {this.props.instruments}</h6>
                    <h5 style={{marginLeft: "40px",color: "#9facc2"}}>Description: {this.props.description}</h5>
                    <h6 style={{marginLeft: "40px",color: "#9facc2"}}>Email: {this.props.email}</h6>
                </div>
                <br/>
                <button class="button" style={{colorborder: "1px solid rgb(70, 171, 230)",marginBottom: "20px", marginLeft: "500px", borderRadius: "50%", backgroundColor: "#343a40"}} onClick={() => this.viewAd(this.props.id)}>
                    <span>View Ad</span>
                </button>

            </div>
        );
    }

}

export default ListResult;