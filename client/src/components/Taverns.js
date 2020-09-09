import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import CheckTypes from './CheckTypes';
import CheckLocation from './CheckLocation';
import '../css/FindMBV.css';
import '../css/Musicians.css';
import axios from 'axios';

class Taverns extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: [],
            listResult: null
        }
        this.applyFilter = this.applyFilter.bind(this);
    }

    async componentDidMount() {
    
        console.log("mount component");
        await axios.get('http://localhost:5000/api/forum/getTaverns', {
            params: {
                // accountType: localStorage.accountType
            }
        }).then(res => {
            this.state.result = res.data;
            console.log(this.state.result);
        });
        this.forceUpdate();
    }


    async applyFilter(event) {
        let checkedTypes = [];
        let checkedLocation;
        var types = document.getElementsByClassName('types');
        let location = document.getElementById('location');
        for (let i = 0; types[i]; ++i) {
            if (types[i].checked) {
                console.log(types[i].value)
                checkedTypes.push(types[i].value);
            }
        }

        checkedLocation = location.value;

        console.log(checkedLocation)
        
        await axios.get('http://localhost:5000/api/forum/getTavernsFilter', {
            params: {
                type: checkedTypes,
                location: checkedLocation
            }
        }).then(res => {
            console.log(localStorage.accountType);
            this.state.result = res.data;
        });

        this.forceUpdate();
    }

    viewAd(email) {
        localStorage.setItem("contactEmail", email);
        window.location.href = "/ContactForm";
    }

    viewProfile(email) {
        localStorage.setItem("contactEmail", email);
        window.location.href = "/profile/tavern";
    }

    render() {
        const style = {
            borderRadius: "25px",
            borderStyle: "solid",
            borderColor: "#343a40",
            height: "40%",
            margin: "3%",
            backgroundColor: "rgba(4,4,4, 0.7)"
        };
        const styleItems = {
            marginLeft: "20px",
            color: "white"
        };

        // const styleButton = {
        //     colorborder: "1px solid rgb(70, 171, 230)",
        //     marginLeft: "75%",
        //     backgroundColor: "#343a40",
        //     textAlign: "center"
        // };

        let adsArray = [];
        for (let e of this.state.result) {
            console.log(e.title);
            adsArray.push(<div style={style}>
                <div style={{ marginTop: "20px" }}>
                    <h2 style={styleItems}>{e.title}</h2>
                    <h5 style={styleItems}>Description: {e.description}</h5>
                    <h6 style={styleItems}>Genre: {e.genre}</h6>
                    <h6 style={styleItems}>We are: {e.type}</h6>
                    <h6 style={styleItems}>Location: {e.location}</h6>
                    <h6 style={styleItems}>Email: {e.user}</h6>
                    <div className="buttons">
                        <button className="btn btn-success" id="styleButton"  onClick={() => this.viewAd(e.user)}> Contact    
                        </button>
                        <span> </span>
                        <button className="btn btn-success" id="styleButtonViewProfile"  onClick={() => this.viewProfile(e.user)}>
                        View profile
                        </button>
                    </div>
                </div>

            </div>);
        }

        return(
            <div>
                <Header />
                <div id="boxesTaverns"> 
                    {/* <img src="/backgrounds/tavernBlur.jpg" alt="image_background"/> */}
                    <div className="container" id="left">
                        <CheckTypes /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <CheckLocation /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <button id="button2" style={{backgroundColor: "#343a40"}} onClick={this.applyFilter}>
                            <span>Apply</span>
                        </button>
                    </div>
                </div>
                <div>
                    <div className="container" id="containerList">
                        <div>
                            {adsArray}
                        </div>
                    </div>
                </div>
                 <Footer />
            </div>
        );
    }

}


export default Taverns;