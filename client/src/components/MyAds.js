import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import ListMyAds from './ListMyAds';

class MyAds extends Component {

    constructor(props){
        super(props);
        this.state = {
            result: [],
            listResult: null
        };
        // this.applyFilter = this.applyFilter.bind(this);
    }

    
    async componentDidMount() {
        
        await axios.get('http://localhost:5000/api/forum/getByEmail', {
            params: {
                email : localStorage.email
            }
        }).then(res => {
            console.log(localStorage.accountType)
            this.state.result = res.data;
            console.log(this.state.result);
            this.state.listResult = this.state.result.map(
                result => <ListMyAds
                id={result._id}
                // key={result.user}
                name={result.title}
                description={result.description}
                email={result.user}
                genre={result.genre}
                instrument={result.instrument}
                type={result.type}
                location={result.location}
                />);
            })
          
          this.forceUpdate();
    }

    
    render() {
        return (
            <div className="createAd">
                <Header />
                    
                    <div className="container" id="containerList">
                        <div>
                            {this.state.listResult}
                        </div>
                    </div>
                
                
                <Footer />
            </div>
            
        );
    }

}

export default MyAds;