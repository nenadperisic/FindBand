import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import CheckTypes from './CheckTypes';
import CheckLocation from './CheckLocation';
import ListTaverns from './ListTaverns';
import '../css/FindMBV.css';

class Taverns extends Component {

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
                    <img src="/backgrounds/tavernBlur.jpg" alt="image_background"/>
                    <div className="container" id="left">
                        <CheckTypes /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <CheckLocation /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <button id="button2" style={{backgroundColor: "#343a40"}} onClick={this.applyFilter}>
                            <span>Apply</span>
                        </button>

                    </div>
                    <div className="container" id="containerList">
                        <ListTaverns/>
                    </div>
                </div>
                 <Footer />
            </div>
        );
    }

}


export default Taverns;