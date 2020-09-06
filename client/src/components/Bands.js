import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import CheckAge from './CheckAge';
import CheckGenres from './CheckGenres';
import CheckLocation from './CheckLocation';
import '../css/FindMBV.css';
import ListResult from './ListResult';
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
            console.log(this.state.result);
            this.state.listResult = this.state.result.map(
                result => <ListResult
                    // id={result.id}
                    // key={result.id}
                    name={result.title}
                    description={result.description}
                    email={result.user}
                    genre={result.genres}
                    averageAge={result.averageAge}
                    // location={result.location}
                />);
        })
    
        this.forceUpdate();
    }


    async applyFilter(event) {
        var checkedAverageAge = [];
        var checkedGenres = [];
        var averageAges = document.getElementsByClassName('averageAge');
        var genres = document.getElementsByClassName('genres');
        for (let i = 0; averageAges[i]; ++i) {
            if (averageAges[i].checked) {
                console.log(averageAges[i].value)
                checkedAverageAge.push(averageAges[i].value);

            }
        }

        for (let i = 0; genres[i]; ++i) {
            // console.log(inputElements)
            if (genres[i].checked) {
                checkedGenres.push(genres[i].value);

            }
        }
        console.log(checkedAverageAge);
        console.log(checkedGenres);
        
        await axios.get('http://localhost:5000/api/forum/getBandsFilter', {
            params: {
                accountType: localStorage.accountType,
                averageAge: checkedAverageAge,
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
                    <img src="/backgrounds/guitarBlur.jpg" alt="image_background"/>
                    <div className="container" id="left">
                        <CheckGenres /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <CheckAge />
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


export default Bands;