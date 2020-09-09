import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import CheckGenres from './CheckGenres';
import CheckInstruments from './CheckInstruments';
import CheckLocation from './CheckLocation';
import '../css/FindMBV.css';
import axios from 'axios';

class Bands extends Component {

    constructor(props){
        super(props);
        this.state = {
            result: [],
            listResult: null
        }
        this.applyFilter = this.applyFilter.bind(this);
    }

    async componentDidMount() {
    
        await axios.get('http://localhost:5000/api/forum/getBands', {
            params: {
                accountType: localStorage.accountType
            }
        }).then(res => {
            console.log(localStorage.accountType)
            this.state.result = res.data;
        });
    
        this.forceUpdate();
    }


    async applyFilter(event) {
        var checkedGenres = [];
        var checkedInstruments = [];
        let checkedLocation;
        var genres = document.getElementsByClassName('genres');
        var instruments = document.getElementsByClassName('instruments');
        let location = document.getElementById('location');

        for (let i = 0; genres[i]; ++i) {
            // console.log(inputElements)
            if (genres[i].checked) {
                checkedGenres.push(genres[i].value);

            }
        }

        for (let i = 0; instruments[i]; ++i) {
            if (instruments[i].checked) {
                console.log(instruments[i].value)
                checkedInstruments.push(instruments[i].value);

            }
        }
        checkedLocation = location.value;
        
        await axios.get('http://localhost:5000/api/forum/getBandsFilter', {
            params: {
                accountType: localStorage.accountType,
                instrument: checkedInstruments,
                genre: checkedGenres,
                location: checkedLocation
            }
        }).then(res => {
            console.log(localStorage.accountType)
            this.state.result = res.data;
        });
        

        this.forceUpdate();
    }

    viewAd(id) {
        console.log(id);
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

        const styleButton = {
            colorborder: "1px solid rgb(70, 171, 230)",
            marginLeft: "75%",
            backgroundColor: "#343a40",
            textAlign: "center"
        };

        let emptyArray = [];
        for (let e of this.state.result) {
            console.log(e.title);
            emptyArray.push(<div style={style}>
                <div style={{ marginTop: "20px" }}>
                    <h2 style={styleItems}>{e.title}</h2>
                    <h5 style={styleItems}>Description: {e.description}</h5>
                    <h6 style={styleItems}>Genre: {e.genre}</h6>
                    <h6 style={styleItems}>Instrument: {e.instrument}</h6>
                    <h6 style={styleItems}>Location: {e.location}</h6>
                    <h6 style={styleItems}>Email: {e.user}</h6>
                    <button className="buttonView" id="button" style={styleButton} onClick={() => this.viewAd(this.props.id)}>
                        <span>View Ad</span>
                    </button>
                </div>

            </div>);
        }

        return(
            <div style={{height: "200vh"}}>
                 <Header />
                 <div id="boxesBand"> 
                    {/* <img src="/backgrounds/guitarBlur.jpg" alt="image_background" id="imageBcg"/> */}
                    </div>
                    <div className="container" id="left">
                        <CheckGenres /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <CheckInstruments />
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <CheckLocation /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <button id="button2" style={{backgroundColor: "#343a40"}} onClick={this.applyFilter}>
                            <span>Apply</span>
                        </button>
                    </div>
                
                <div>
                    <div className="container" id="containerList">
                        <div>
                            {emptyArray}
                        </div>
                    </div>
                </div>
                 <Footer />
            </div>
        );
    }

}


export default Bands;