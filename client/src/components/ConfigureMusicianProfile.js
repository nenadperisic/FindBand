import React, { Component } from 'react';
import axios from 'axios';
import '../css/ConfigureProfile.css';
import Header from './Header';

class ConfigureMusicianProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forAccount: {
                name: '',
                dateOfBirth: '',
                genres: [],
                instruments: [],
                location: '',
                description: '',
                professionalAccount: '' // doing this for money or for fun
            }
        };

        this.genres = [];
        this.instruments = [];

        this.onNameChange = this.onNameChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onSelectGenreChange = this.onSelectGenreChange.bind(this);
        this.onSelectInstrumentChange = this.onSelectInstrumentChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.handleConfigureMusician = this.handleConfigureMusician.bind(this);
    }

    onNameChange(name) {
        const forAccount = {
            name: name.target.value,
            dateOfBirth: this.state.forAccount.dateOfBirth,
            genres: this.state.forAccount.genres,
            instruments: this.state.forAccount.instruments,
            location: this.state.forAccount.location,
            description: this.state.forAccount.description,
            professionalAccount: this.state.forAccount.professionalAccount,
        }
        this.setState({
            forAccount
        });
    }

    onDateChange(dateOfBirth) {
        const forAccount = {
            name: this.state.forAccount.name,
            dateOfBirth: dateOfBirth.target.value,
            genres: this.state.forAccount.genres,
            instruments: this.state.forAccount.instruments,
            location: this.state.forAccount.location,
            description: this.state.forAccount.description,
            professionalAccount: this.state.forAccount.professionalAccount,
        }
        this.setState({
            forAccount
        });
    }

    onSelectGenreChange(selectedGenre) {
        if (selectedGenre.target.checked)
            this.genres.push(selectedGenre.target.value);
        else
            this.genres = this.genres.filter(e => e !== selectedGenre.target.value);

        console.log(this.genres);

        const forAccount = {
            name: this.state.forAccount.name,
            dateOfBirth: this.state.forAccount.dateOfBirth,
            genres: this.genres,
            instruments: this.state.forAccount.instruments,
            location: this.state.forAccount.location,
            description: this.state.forAccount.description,
            professionalAccount: this.state.forAccount.professionalAccount,
        }
        this.setState({
            forAccount
        });
    }

    onSelectInstrumentChange(selectedInstrument) {
        if (selectedInstrument.target.checked)
            this.instruments.push(selectedInstrument.target.value);
        else
            this.instruments = this.instruments.filter(e => e !== selectedInstrument.target.value);

        console.log(this.instruments);

        const forAccount = {
            name: this.state.forAccount.name,
            dateOfBirth: this.state.forAccount.dateOfBirth,
            genres: this.state.forAccount.genres,
            instruments: this.instruments,
            location: this.state.forAccount.location,
            description: this.state.forAccount.description,
            professionalAccount: this.state.forAccount.professionalAccount,
        }
        this.setState({
            forAccount
        });
    }

    onLocationChange(location) {
        const forAccount = {
            name: this.state.forAccount.name,
            dateOfBirth: this.state.forAccount.dateOfBirth,
            genres: this.state.forAccount.genres,
            instruments: this.state.forAccount.instruments,
            location: location.target.value,
            description: this.state.forAccount.description,
            professionalAccount: this.state.forAccount.professionalAccount,
        }
        this.setState({
            forAccount
        });
    }

    onDescriptionChange(description) {
        const forAccount = {
            name: this.state.forAccount.name,
            dateOfBirth: this.state.forAccount.dateOfBirth,
            genres: this.state.forAccount.genres,
            instruments: this.state.forAccount.instruments,
            location: this.state.forAccount.location,
            description: description.target.value,
            professionalAccount: this.state.forAccount.professionalAccount,
        }
        this.setState({
            forAccount
        });
    }

    onTypeChange(type) {
        const forAccount = {
            name: this.state.forAccount.name,
            dateOfBirth: this.state.forAccount.dateOfBirth,
            genres: this.state.forAccount.genres,
            instruments: this.state.forAccount.instruments,
            location: this.state.forAccount.location,
            description: this.state.forAccount.description,
            professionalAccount: type.target.value,
        }
        this.setState({
            forAccount
        });
    }

    handleConfigureMusician = async event => {
        const forAccount = this.state.forAccount;
        // event.preventDefault();
        console.log(forAccount);

        try {
            /*await*/ axios.post(
                'http://localhost:5000/api/user/configure/musician', 
                { 
                    email: localStorage.email,
                    name: forAccount.name,
                    dateOfBirth: forAccount.dateOfBirth,
                    genres: forAccount.genres,
                    instruments: forAccount.instruments,
                    location: forAccount.location,
                    description: forAccount.description,
                    professionalAccount: forAccount.professionalAccount
            });

            this.genres = [];
            this.instruments = [];

            console.log("musicianProfile response:");
            console.log(localStorage.email);
            // console.log(response.forAccount);
            localStorage.setItem("age", forAccount);
        } catch (e) {
            console.log(e.response.data.message);
            // window.alert("Something is wrong!");
        }

        document.getElementById("musicianAccountForm").reset();

        // every checkbox needs to be separately
        document.getElementById("pop").checked = false;
        document.getElementById("rock").checked = false;
        document.getElementById("jazz").checked = false;
        document.getElementById("metal").checked = false;
        document.getElementById("folk").checked = false;
        document.getElementById("voice").checked = false;
        document.getElementById("guitar").checked = false;
        document.getElementById("bassGuitar").checked = false;
        document.getElementById("piano").checked = false;
        document.getElementById("violin").checked = false;
        document.getElementById("drums").checked = false;
        document.getElementById("trumpet").checked = false;
    }

    render() {
        return (
            <div className="profile">
                <Header />
                <div className="container">
                    <form id="musicianAccountForm">
                        <h2> Configure your profile </h2>

                        <div className="form-group">
                            <label htmlFor="name"> Full name: </label>
                            <input type="textarea" className="form-control" id="name" placeholder="Enter full name" name="name" onChange={this.onNameChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateOfBirth"> Date of birth: </label>
                            <input type="date" 
                                className="form-control" 
                                id="dateOfBirth" 
                                name="dateOfBirth" 
                                onChange={this.onDateChange} />
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
                            <label> Select instruments: </label> <br/>
                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" value="voice" id="voice" onChange={this.onSelectInstrumentChange}/>
                                <label className="custom-control-label" htmlFor="voice"> Voice </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" value="guitar" id="guitar" onChange={this.onSelectInstrumentChange}/>
                                <label className="custom-control-label" htmlFor="guitar"> Guitar </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" value="bassGuitar" id="bassGuitar" onChange={this.onSelectInstrumentChange}/>
                                <label className="custom-control-label" htmlFor="bassGuitar"> Bass Guitar </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" value="piano" id="piano" onChange={this.onSelectInstrumentChange}/>
                                <label className="custom-control-label" htmlFor="piano"> Piano </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" value="violin" id="violin" onChange={this.onSelectInstrumentChange}/>
                                <label className="custom-control-label" htmlFor="violin"> Violin </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" value="drums" id="drums" onChange={this.onSelectInstrumentChange}/>
                                <label className="custom-control-label" htmlFor="drums"> Drums </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input" value="trumpet" id="trumpet" onChange={this.onSelectInstrumentChange}/>
                                <label className="custom-control-label" htmlFor="trumpet"> Trumpet </label>
                            </div>
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="instruments"> Instruments: </label>
                            <select id="instruments" className="form-control" onChange={this.onSelectedInstrumentChange} >
                                <option value="not_selected">Select Instrument</option>
                                <option value="guitar"> Guitar </option>
                                <option value="bassGuitar"> Bass Guitar </option>
                                <option value="piano"> Piano </option>
                                <option value="violin"> Violin </option>
                                <option value="voice"> Voice </option>
                                <option value="drums"> Drums </option>
                                <option value="trumpet"> Trumpet </option>
                            </select>
                        </div> */}

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

                        <button type="button" onClick={this.handleConfigureMusician} className="btn btn-success"> Save changes </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ConfigureMusicianProfile;