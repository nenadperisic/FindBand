import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import CheckAge from './CheckAge';
import CheckGenres from './CheckGenres';
import CheckLocation from './CheckLocation';
import ListBands from './ListBands';
import '../css/FindMBV.css';

class Bands extends Component {

    constructor(props){
        super(props);

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
                    <img src="/backgrounds/guitarBlur.jpg" alt="image_background"/>
                    <div className="container" id="left">
                        <CheckGenres /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <CheckAge />
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <CheckLocation /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <button className="button" id="button2" style={{borderRadius: "50%", backgroundColor: "#343a40"}} onClick={this.applyFilter}>
                            <span>Apply</span>
                        </button>

                    </div>
                    <div className="container" id="containerList">
                        <ListBands/>
                    </div>
                </div>
                 <Footer />
            </div>
        );
    }

}


export default Bands;