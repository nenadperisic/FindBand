import React, { Component } from 'react';
import axios from 'axios';
import '../css/ConfigureProfile.css';
import Header from './Header';

class ConfigureBandProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forBand: {
                name: '',
                genre: ''
            }
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onGenreChange = this.onGenreChange.bind(this);
        this.handleConfigureBand = this.handleConfigureBand.bind(this);
    }

    onNameChange(name) {
        const forBand = {
            name: name.target.value,
            genre: this.state.forBand.genre
        }
        this.setState({
            forBand
        });
    }

    onGenreChange(genre) {
        const forBand = {
            name: this.state.forBand.name,
            genre: genre.target.value
        }
        this.setState({
            forBand
        });
    }

    handleConfigureBand = async event => {
        const forBand = this.state.forBand;
        // event.preventDefault();

        try {
            // TODO: write band data into dabase
            console.log("Writing data into database...");
            console.log(forBand.name);
            console.log(forBand.genre);

            // const response = /* await */ axios.post('http://localhost:5000/api/user/bandProfile', { email: localStorage.email, name: forBand.name, genre: forBand.genre });
            // console.log("bandProfile response:");
            // console.log(localStorage.email);
            // console.log(response.forBand);
            // localStorage.setItem("name", forBand);
            // localStorage.setItem("genre", forBand);
        } catch (e) {
            // console.log(e.response.data.message);
            window.alert("Something is wrong!");
        }

        document.getElementById("bandAccountForm").reset();
    }

    render() {
        return (
            <div className="profile">
                <Header />
                <div className="container" id="bandAccount">
                    <form id="bandAccountForm">
                        <h2> Configure your profile </h2>

                        <div className="form-group">
                            <label htmlFor="name"> Band name: </label>
                            <input type="textarea" className="form-control" id="name" placeholder="Enter band name" name="name" onChange={this.onNameChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="genre"> Genre: </label>
                            <input type="textarea" className="form-control" id="genre" placeholder="Enter genre" name="genre" onChange={this.onGenreChange} />
                        </div>

                        <button type="button" onClick={this.handleConfigureBand} className="btn btn-success"> Save changes </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ConfigureBandProfile;