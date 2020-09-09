import React, { Component } from 'react';
import axios from 'axios';

class ListMyAds extends Component{

    constructor(props){
        super(props)

        this.viewAd = this.viewAd.bind(this);
        this.removeAd = this.removeAd.bind(this);
    }

    viewAd(id){
        console.log(id);
    }

    removeAd = async event => {
        
        const confirm = window.confirm("Do you want to delete your ad? If you do, your ad will be permanently lost!")
        if (!confirm) {
            return;
        }
        try {
            await  axios.post('http://localhost:5000/api/forum/deleteAd', { id: this.props.id });

            
        } catch (e) {
            console.log("Delete failed!");
        }
        
        window.alert("Ad deleted successfully!");                
        window.location.href = "/MyAds";
        
    }

    render(){
        const style={
                borderRadius: "25px", 
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
                backgroundColor: "#343a40",
                textAlign: "center"
            };

            if (localStorage.accountType === "tavern") {
                return (<div style={style}>
                    <div style={{ marginTop: "20px" }}>
                        <h2 style={styleItems}>{this.props.title}</h2>
                        <h5 style={styleItems}>Description: {this.props.description}</h5>
                        <h6 style={styleItems}>Genre: {this.props.genre}</h6>
                        <h6 style={styleItems}>We are: {this.props.type}</h6>
                        <h6 style={styleItems}>Location: {this.props.location}</h6>
                        <h6 style={styleItems}>Email: {this.props.email}</h6>
                        <div className="buttons">
                            <button className="btn btn-success" id="styleButton" onClick={() => this.removeAd(this.props.id)}>
                                <span>Remove Ad</span>
                            </button>
                        </div>
                    </div>

                </div>);
            } else {
                return (<div style={style}>
                    <div style={{ marginTop: "20px" }}>
                        <h2 style={styleItems}>{this.props.title}</h2>
                        <h5 style={styleItems}>Description: {this.props.description}</h5>
                        <h6 style={styleItems}>Genre: {this.props.genre}</h6>
                        <h6 style={styleItems}>Instrument: {this.props.instrument}</h6>
                        <h6 style={styleItems}>Location: {this.props.location}</h6>
                        <h6 style={styleItems}>Email: {this.props.email}</h6>
                        <div className="buttons">
                            <button className="btn btn-success" id="styleButton" onClick={() => this.removeAd(this.props.id)}>
                                <span>Remove Ad</span>
                            </button>
                        </div>
                    </div>

                </div>);
            }
    }

}

export default ListMyAds;