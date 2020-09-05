import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import CheckTypes from './CheckTypes';
import CheckLocation from './CheckLocation';
import ListTaverns from './ListTaverns';
import ListResult from './ListResult';
import '../css/FindMBV.css';
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
        {
            console.log("mount component");
            await axios.get('http://localhost:5000/api/forum/getTaverns', {
                params: {
                    // accountType: localStorage.accountType
                }
            }).then(res => {
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
                        location={result.location}
                    />);
            })
        }
        this.forceUpdate();
    }


    async applyFilter(event) {
        let checkedTypes = [];
        let checkedLocation;
        var types = document.getElementsByClassName('types');
        let location = document.getElementById('tavernLocation');
        for (let i = 0; types[i]; ++i) {
            if (types[i].checked) {
                console.log(types[i].value)
                checkedTypes.push(types[i].value);
            }
        }

        checkedLocation = location.value;

        console.log(checkedLocation)
        {
            await axios.get('http://localhost:5000/api/forum/getTavernsFilter', {
                params: {
                    type: checkedTypes,
                    location: checkedLocation
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
                        type={result.type}
                        location={result.location}
                    />);
            })
        }

        this.forceUpdate();
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


export default Taverns;