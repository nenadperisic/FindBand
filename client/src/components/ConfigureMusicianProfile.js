import React, { Component } from 'react';
import axios from 'axios';
import '../css/ConfigureProfile.css';
import Header from './Header';

class ConfigureMusicianProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forAccount: {
                dateOfBirth: '',
                genre: '',
                instruments: '',
                location: '',
                description: '',
                accountType: '' // doing this for money or for fun
            }
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.onGenreChange = this.onGenreChange.bind(this);
        this.onInstrumentsChange = this.onInstrumentsChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.handleConfigureMusician = this.handleConfigureMusician.bind(this);
    }

    onDateChange(dateOfBirth) {
        console.log(dateOfBirth.target.value)
        const forAccount = {
            dateOfBirth: dateOfBirth.target.value,
            genre: this.state.forAccount.genre,
            instruments: this.state.forAccount.instruments,
            location: this.state.forAccount.location,
            description: this.state.forAccount.description,
            accountType: this.state.forAccount.accountType,
        }
        this.setState({
            forAccount
        });
    }

    onGenreChange(genre) {
        const forAccount = {
            dateOfBirth: this.state.forAccount.dateOfBirth,
            genre: genre.target.value,
            instruments: this.state.forAccount.instruments,
            location: this.state.forAccount.location,
            description: this.state.forAccount.description,
            accountType: this.state.forAccount.accountType,
        }
        this.setState({
            forAccount
        });
    }

    onInstrumentsChange(instruments) {
        const forAccount = {
            dateOfBirth: this.state.forAccount.dateOfBirth,
            genre: this.state.forAccount.genre,
            instruments: instruments.target.value,
            location: this.state.forAccount.location,
            description: this.state.forAccount.description,
            accountType: this.state.forAccount.accountType,
        }
        this.setState({
            forAccount
        });
    }

    onLocationChange(location) {
        const forAccount = {
            dateOfBirth: this.state.forAccount.dateOfBirth,
            genre: this.state.forAccount.genre,
            instruments: this.state.forAccount.instruments,
            location: location.target.value,
            description: this.state.forAccount.description,
            accountType: this.state.forAccount.accountType,
        }
        this.setState({
            forAccount
        });
    }

    onDescriptionChange(description) {
        const forAccount = {
            dateOfBirth: this.state.forAccount.dateOfBirth,
            genre: this.state.forAccount.genre,
            instruments: this.state.forAccount.instruments,
            location: this.state.forAccount.location,
            description: description.target.value,
            accountType: this.state.forAccount.accountType,
        }
        this.setState({
            forAccount
        });
    }

    onTypeChange(type) {
        const forAccount = {
            dateOfBirth: this.state.forAccount.dateOfBirth,
            genre: this.state.forAccount.genre,
            instruments: this.state.forAccount.instruments,
            location: this.state.forAccount.location,
            description: this.state.forAccount.description,
            accountType: type.target.value,
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
            const response = /* await */ axios.post(
                'http://localhost:5000/api/user/configure/musician', 
                { 
                    email: localStorage.email, 
                    dateOfBirth: forAccount.dateOfBirth,
                    genre: forAccount.genre,
                    instruments: forAccount.instruments,
                    location: forAccount.location,
                    description: forAccount.description,
                    accountType: forAccount.accountType
                });
            console.log("musicianProfile response:");
            console.log(localStorage.email);
            console.log(response.forAccount);
            localStorage.setItem("age", forAccount);
        } catch (e) {
            console.log(e.response.data.message);
            // window.alert("Something is wrong!");
        }

        document.getElementById("musicanAccountForm").reset();
    }

    render() {
        return (
            <div className="profile">
                <Header />
                <div className="container" id="musicianAccount">
                    <form id="musicanAccountForm">
                        <h2> Configure your profile </h2>

                        <div className="form-group">
                            <label htmlFor="dateOfBirth"> Date of birth: </label>
                            <input type="date" 
                                className="form-control" 
                                id="dateOfBirth" 
                                name="dateOfBirth" 
                                onChange={this.onDateChange} />
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
                            <label htmlFor="instruments"> Instruments: </label>
                            <select id="instruments" className="form-control" onChange={this.onInstrumentsChange} >
                                <option value="not_selected">Select Instrument</option>
                                <option value="guitar"> Pop </option>
                                <option value="bassGuitar"> Bass Guitar </option>
                                <option value="piano"> Piano </option>
                                <option value="violin"> Violin </option>
                                <option value="voice"> Voice </option>
                                <option value="drums"> Drums </option>
                                <option value="trumpet"> Trumpet </option>
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

                        <button type="button" onClick={this.handleConfigureMusician} className="btn btn-success"> Save changes </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ConfigureMusicianProfile;