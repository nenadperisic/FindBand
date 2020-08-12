import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import CheckAge from './CheckAge';
import CheckGenres from './CheckGenres';
import CheckLocation from './CheckLocation';
import ListBands from './ListBands';
import '../css/FindMBT.css';

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
                    <img src="/wood.jpg" alt="image_background"/>
                    <div className="container" id="left">
                        <CheckGenres /> 
                        <hr style={{height:"1px", backgroundColor:"black"}}/>
                        <CheckAge />
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


export default Bands;