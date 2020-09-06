import React, { Component } from 'react';
import '../css/TavernProfile.css';
import Header from './Header';
import Footer from './Footer';
import TavernProfileResults from './TavernProfileResults';
import axios from 'axios';


class TavernProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            description: '',
            listResult: null,
            result: []
        };

        this.handleConfigureProfile = this.handleConfigureProfile.bind(this);
    }

    handleConfigureProfile = async event => {
        window.location.href = "/configure";
    }

    async componentDidMount(){
    
        await axios.post('http://localhost:5000/api/user/profile/tavern', {
            email: localStorage.email
        }).then(res => {
            console.log(localStorage.email)
            this.state.result = res.data;
            console.log(this.state.result);
            this.state.listResult = this.state.result.map(
                result => <TavernProfileResults
                    // id={result.id}
                    key={result._id}
                    name={result.name}
                    email={result.email}
                    tavernType={result.tavernType}
                    location={result.location}
                    description={result.description}
                />);
        });

    
        this.forceUpdate();
    }

    render() {
        const style={
            // backgroundImage: "url('/backgrounds/grayBlur.jpg')",
            height: "100vh",
            width: "100%",
            backgroundRepeat: "repeat"
        }
        return (
            <div className="profile" style={style}>
                <Header />
                <button type="button" id="configureBtn" onClick={this.configureProfile}> <span>Configure profile </span></button>
                {this.state.listResult}
                <Footer />
            </div>
        );
    }
}

export default TavernProfile;