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
                genre: '',
                location: '',
                description: '',
                accountType: '',
            }
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onGenreChange = this.onGenreChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.handleConfigureBand = this.handleConfigureBand.bind(this);
    }

    onNameChange(name) {
        const forBand = {
            name: name.target.value,
            genre: this.state.forBand.genre,
            location: this.state.forBand.location,
            description: this.state.forBand.description,
            accountType: this.state.forBand.accountType
        }
        this.setState({
            forBand
        });
    }

    onGenreChange(genre) {
        const forBand = {
            name: this.state.forBand.name,
            genre: genre.target.value,
            location: this.state.forBand.location,
            description: this.state.forBand.description,
            accountType: this.state.forBand.accountType
        }
        this.setState({
            forBand
        });
    }

    onLocationChange(location) {
        const forBand = {
            name: this.state.forBand.name,
            genre: this.state.forBand.genre,
            location: location.target.value,
            description: this.state.forBand.description,
            accountType: this.state.forBand.accountType
        }
        this.setState({
            forBand
        });
    }

    onDescriptionChange(description) {
        const forBand = {
            name: this.state.forBand.name,
            genre: this.state.forBand.genre,
            location: this.state.forBand.location,
            description: description.target.value,
            accountType: this.state.forBand.accountType
        }
        this.setState({
            forBand
        });
    }

    onTypeChange(type) {
        const forBand = {
            name: this.state.forBand.name,
            genre: this.state.forBand.genre,
            location: this.state.forBand.location,
            description: this.state.forBand.description,
            accountType: type.target.value
        }
        this.setState({
            forBand
        });
    }

    handleConfigureBand = async event => {
        const forBand = this.state.forBand;
        // event.preventDefault();


        try {
            /* await */ axios.post(
                'http://localhost:5000/api/user/configure/band',
                {
                    email: localStorage.email,
                    name: forBand.name,
                    genre: forBand.genre,
                    location: forBand.location,
                    description: forBand.description,
                    accountType: forBand.accountType
                });

            console.log("bandProfile response:");
            console.log(localStorage.email);
            // console.log(response.forBand);
            localStorage.setItem("name", forBand);
            localStorage.setItem("genre", forBand);
        } catch (e) {
            console.log(e.response.data.message);
            // window.alert("Something is wrong!");
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
                            <select id="genre" className="form-control" onChange={this.onGenreChange} >
                                <option value="not_selected">Select genre</option>
                                <option value="pop"> Pop </option>
                                <option value="rock"> Rock </option>
                                <option value="Jazz"> Jazz </option>
                                <option value="metal"> Metal </option>
                                <option value="folk"> Folk </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="location"> Location: </label>
                            <select id="location" className="form-control" onChange={this.onLocationChange} >
                                <option value="not_selected">Select Location</option>
                                <option value="belgrade"> Belgrade </option>
                                <option value="noviSad"> Novi Sad </option>
                                <option value="nis"> Niš </option>
                                <option value="kragujevac"> Kragujevac </option>
                                <option value="subotica"> Subotica </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description"> Profile description: </label>
                            <textarea class="form-control"
                                id="description"
                                rows="5"
                                onChange={this.onDescriptionChange}></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="type"> Account type: </label>
                            <select id="type" className="form-control" onChange={this.onTypeChange} >
                                <option value="not_selected"> Select account type </option>
                                <option value="proffesional"> I am planning on making money out of this </option>
                                <option value="hobby"> Doing this just for fun! </option>
                            </select>
                        </div>

                        <button type="button" onClick={this.handleConfigureBand} className="btn btn-success"> Save changes </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ConfigureBandProfile;