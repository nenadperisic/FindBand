import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import CheckInstruments from './CheckInstruments';
import CheckGenres from './CheckGenres';
import CheckLocation from './CheckLocation';
import ListBands from './ListBands';
import '../css/Musicians.css';

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
                    <img src="/wood.jpg" alt="image_background"/>
                    <div className="container" id="left">
                        <CheckInstruments />
                        <hr style={{height:"1px", backgroundColor:"black"}}/>
                        <CheckGenres /> 
                        <hr style={{height:"1px", backgroundColor:"black"}}/>
                        <CheckLocation /> 
                        <hr style={{height:"1px", backgroundColor:"black"}}/>
                        <button onClick={this.applyFilter}>Apply</button>

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


export default Musicians;