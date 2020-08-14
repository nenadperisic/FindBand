import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import CheckInstruments from './CheckInstruments';
import CheckGenres from './CheckGenres';
import CheckLocation from './CheckLocation';
import ListMusicians from './ListMusicians';
import '../css/FindMBV.css';

class Musicians extends Component {

    constructor(props){
        super(props);
        this.state = {
            instruments: []
        };
        this.applyFilter = this.applyFilter.bind(this);
    }


    applyFilter(event){
        console.log("WORKING!");
    }


    render() {
        return(
            <div>
                 <Header />
                 <div id="boxes"> 
                    <img src="/backgrounds/speakerBlur.jpg" alt="image_background"/>
                    <div className="container" id="left">
                        <CheckInstruments />
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <CheckGenres /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <CheckLocation /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <button  className="button" style={{borderRadius: "50%", backgroundColor: "#343a40"}} onClick={this.applyFilter}>
                            <span>Apply</span>
                        </button>

                    </div>
                    <div className="container" id="containerList">
                        <ListMusicians/>
                    </div>
                </div>
                 <Footer />
            </div>
        );
    }

}


export default Musicians;