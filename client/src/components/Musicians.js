import React, { Component } from 'react';
import axios from 'axios';
import ListResult from './ListResult';
import Header from './Header';
import Footer from './Footer';
import CheckInstruments from './CheckInstruments';
import CheckGenres from './CheckGenres';
import CheckLocation from './CheckLocation';
import '../css/FindMBV.css';

class Musicians extends Component {

    constructor(props){
        super(props);
        this.state = {
            result: [],
            listResult: null
        };
        this.applyFilter = this.applyFilter.bind(this);
    }

    async componentDidMount() {
    
        await axios.get('http://localhost:5000/api/forum/getMusicians', {
            params: {
                accountType : localStorage.accountType
            }
        }).then(res => {
            console.log(localStorage.accountType)
            this.state.result = res.data;
            console.log(this.state.result);
            this.state.listResult = this.state.result.map(
                result => <ListResult
                // id={result.id}
                // key={result.user}
                name={result.title}
                description={result.description}
                email={result.user}
                genre={result.genres}
                instruments={result.instruments}
                // location={result.location}
                />);
            })
        
          this.forceUpdate();
    }


    async applyFilter(event){
        var checkedInstruments = []; 
        var checkedGenres = [];
        var instruments = document.getElementsByClassName('instruments');
        var genres = document.getElementsByClassName('genres');
        for(var i=0; instruments[i]; ++i){
            // console.log(inputElements)
            if(instruments[i].checked){
                console.log(instruments[i].value)
                checkedInstruments.push(instruments[i].value);
                
             }
        }
        for(i=0; genres[i]; ++i){
            // console.log(inputElements)
            if(genres[i].checked){
                checkedGenres.push(genres[i].value);
                
             }
        }
        console.log(checkedInstruments);
        console.log(checkedGenres);
        
        await axios.get('http://localhost:5000/api/forum/getMusiciansFilter', {
            params: {
                accountType : localStorage.accountType,
                instruments: checkedInstruments,
                genres: checkedGenres
            }
        }).then(res => {
            console.log(localStorage.accountType)
            this.state.result = res.data;
            console.log(this.state.result);
            this.state.listResult = this.state.result.map(
                result => <ListResult
                // id={result.id}
                // key={result.id}
                name={result.title}
                description={result.description}
                email={result.user}
                genre={result.genres}
                instruments={result.instruments}
                // location={result.location}
                />);
            })
        
          
          this.forceUpdate();
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
                        <button id="button2" style={{backgroundColor: "#343a40"}} onClick={this.applyFilter}>
                            <span>Apply</span>
                        </button>

                    </div>
                    <div className="container" id="containerList">
                        <div>
                            {this.state.listResult}
                        </div>
                    </div>
                </div>
                 <Footer />
            </div>
        );
    }

}


export default Musicians;