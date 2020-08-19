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
                genres: '',
                location: '',
                description: '',
                professionalAccount: '',
            }
        };

        this.genres = [];

        this.onNameChange = this.onNameChange.bind(this);
        this.onSelectGenreChange = this.onSelectGenreChange.bind(this);
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
            professionalAccount: this.state.forBand.professionalAccount
        }
        this.setState({
            forBand
        });
    }

    onSelectGenreChange(selectedGenre) {
        if (selectedGenre.target.checked)
            this.genres.push(selectedGenre.target.value);
        else
            this.genres = this.genres.filter(e => e !== selectedGenre.target.value);

        console.log(this.genres);

        const forBand = {
            name: this.state.forBand.name,
            genres: this.genres,
            location: this.state.forBand.location,
            description: this.state.forBand.description,
            professionalAccount: this.state.forBand.professionalAccount
        }
        this.setState({
            forBand
        });
    }

    onLocationChange(location) {
        const forBand = {
            name: this.state.forBand.name,
            genres: this.state.forBand.genres,
            location: location.target.value,
            description: this.state.forBand.description,
            professionalAccount: this.state.forBand.professionalAccount
        }
        this.setState({
            forBand
        });
    }

    onDescriptionChange(description) {
        const forBand = {
            name: this.state.forBand.name,
            genres: this.state.forBand.genres,
            location: this.state.forBand.location,
            description: description.target.value,
            professionalAccount: this.state.forBand.professionalAccount
        }
        this.setState({
            forBand
        });
    }

    onTypeChange(type) {
        const forBand = {
            name: this.state.forBand.name,
            genres: this.state.forBand.genres,
            location: this.state.forBand.location,
            description: this.state.forBand.description,
            professionalAccount: type.target.value
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
                    genres: forBand.genres,
                    location: forBand.location,
                    description: forBand.description,
                    accountType: forBand.accountType
                });

            this.genres = [];

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

        // every checkbox needs to be separately
        document.getElementById("pop").checked = false;
        document.getElementById("rock").checked = false;
        document.getElementById("jazz").checked = false;
        document.getElementById("metal").checked = false;
        document.getElementById("folk").checked = false;
    }

    render() {
        return (
            <div className="profile">
                <Header />
                <div className="container">
                    <form id="bandAccountForm">
                        <h2> Configure your profile </h2>

                        <div className="form-group">
                            <label htmlFor="name"> Band name: </label>
                            <input type="textarea" className="form-control" id="name" placeholder="Enter band name" name="name" onChange={this.onNameChange} />
                        </div>

                        <div className="form-group">
                            <label> Select genre: </label> <br/>
                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" value="pop" id="pop" onChange={this.onSelectGenreChange}/>
                                <label className="custom-control-label" htmlFor="pop"> Pop </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" value="rock" id="rock" onChange={this.onSelectGenreChange}/>
                                <label className="custom-control-label" htmlFor="rock"> Rock </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" value="jazz" id="jazz" onChange={this.onSelectGenreChange}/>
                                <label className="custom-control-label" htmlFor="jazz"> Jazz </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" value="metal" id="metal" onChange={this.onSelectGenreChange}/>
                                <label className="custom-control-label" htmlFor="metal"> Metal </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" value="folk" id="folk" onChange={this.onSelectGenreChange}/>
                                <label className="custom-control-label" htmlFor="folk"> Folk </label>
                            </div>
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
                            <textarea className="form-control"
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