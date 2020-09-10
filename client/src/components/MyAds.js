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
        const styleList={
            position: "relative",
            width: "70%",
            margin: "auto",
            marginTop: "0",
            marginBottom: "0",
            transform: "translate(-50%)",
		}
        const styleCreateAd = {
            backgroundImage: "url('/backgrounds/showAdsBcgBlur.jpg')",
            height: "100vh"
        }
        return (
            <div className="createAd" style={styleCreateAd}>
                <Header />
                    
                    <div className="container" id="containerList" style={styleList}>
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