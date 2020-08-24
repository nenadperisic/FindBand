import React, { Component } from 'react';
import axios from 'axios';
import '../css/ConfigureProfile.css';
import Header from './Header';

class ConfigureMusicianProfile extends Component {
    constructor(props) {
        super(props);

        this.handleConfigureMusician = this.handleConfigureMusician.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    deleteAccount = async event => {
        if (!localStorage.email) {
            window.alert("You must be logged in in order to delete your account!");
        } else {
            const confirm = window.confirm("Do you want to delete your accout? If you do, your account data will be permanently lost!")
            if (confirm) {
                try {
                    /* await */ axios.post('http://localhost:5000/api/user/profile/deleteAccount', { email: localStorage.email });

                    window.alert("account deleted successfully!");

                    localStorage.clear();
                    window.location.href = "/";
                } catch (e) {
                    console.log(e.response.data.message);
                }
            }
        }
    }

    handleConfigureMusician = async event => {
        let forAccount = this.getValues();

        console.log(forAccount);

        let isValid = this.checkValidity(forAccount);
        if (!isValid) {
            return ;
        }

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

            console.log(localStorage.email);

            window.alert("Account updated successfully!");
            window.location.href = "/profile/musician";
        } catch (e) {
            console.log(e.response.data.message);
        }

        document.getElementById("musicianAccountForm").reset();

        // every checkbox needs to be separately unchecked
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

    checkValidity(account) {
        // TODO: check validity of name and date of birth

        if (account.name === "") {
            window.alert("Please insert username!");
            return false;
        } else if (account.dateOfBirth === "" || !account.dateOfBirth) {
            window.alert("Please insert your date of birth!");
            return false;
        } else if (account.location === "not_selected") {
            window.alert("Please select location!");
            return false;
        } else if (account.professionalAccount === "not_selected") {
            window.alert("Please select account usage!");
            return false;
        }

        return true;
    }

    getValues() {
        let values = {};
        values.name = document.getElementById('name').value;
        values.dateOfBirth = document.getElementById('dateOfBirth').value;
        values.location = document.getElementById('location').value;
        values.professionalAccount = document.getElementById('type').value;
        values.description = document.getElementById('description').value;
        values.genres = [];
        values.instruments = [];

        let genres = Array.from(document.getElementsByClassName("genre-select")).map(tag => tag.id);
        for (let genre of genres) {
            if (document.getElementById(genre).checked) {
                values.genres.push(genre);
            }
        }

        let instruments = Array.from(document.getElementsByClassName("instrument-select")).map(tag => tag.id);
        for (let instrument of instruments) {
            if (document.getElementById(instrument).checked) {
                values.instruments.push(instrument);
            }
        }

        return values;
    }

    setValues = async event => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/user/get/user/data',
                { email: localStorage.email }
            );

            const {user} = response.data;

            document.getElementById('name').value = !user.name ? "" : user.name;
            document.getElementById('dateOfBirth').value = !user.dateOfBirth ? "" : user.dateOfBirth.slice(0, 10);
            document.getElementById('description').value = !user.description ? "" : user.description;
            document.getElementById('location').value = !user.location ? "not_selected" : user.location;
            document.getElementById('type').value = !user.professionalAccount ? "not_selected" : user.professionalAccount;

            for (let genre of user.genres) {
                document.getElementById(genre).checked = true;
            }

            for (let instrument of user.instruments) {
                document.getElementById(instrument).checked = true;
            }
        } catch (e) {
            // console.log(e.response.data.message);
        }
    }

    componentDidMount() {
        this.setValues();
    }

    render() {
        return (
            <div className="profile">
                <Header />
                <div className="container">
                    <form id="musicianAccountForm">
                        <h2> Configure your profile </h2>

                        <div className="form-group">
                            <label htmlFor="name"> Username: </label>
                            <input type="textarea" className="form-control" id="name" placeholder="Enter full name" name="name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateOfBirth"> Date of birth: </label>
                            <input type="date" 
                                className="form-control" 
                                id="dateOfBirth" 
                                name="dateOfBirth" />
                        </div>

                        <div className="form-group">
                            <label> Select genre: </label> <br/>
                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input genre-select" value="pop" id="pop" />
                                <label className="custom-control-label" htmlFor="pop"> Pop </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input genre-select" value="rock" id="rock" />
                                <label className="custom-control-label" htmlFor="rock"> Rock </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input genre-select" value="jazz" id="jazz" />
                                <label className="custom-control-label" htmlFor="jazz"> Jazz </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input genre-select" value="metal" id="metal" />
                                <label className="custom-control-label" htmlFor="metal"> Metal </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input genre-select" value="folk" id="folk" />
                                <label className="custom-control-label" htmlFor="folk"> Folk </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label> Select instruments: </label> <br/>
                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="voice" id="voice" />
                                <label className="custom-control-label" htmlFor="voice"> Voice </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="guitar" id="guitar" />
                                <label className="custom-control-label" htmlFor="guitar"> Guitar </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="bassGuitar" id="bassGuitar" />
                                <label className="custom-control-label" htmlFor="bassGuitar"> Bass Guitar </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="piano" id="piano" />
                                <label className="custom-control-label" htmlFor="piano"> Piano </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="violin" id="violin" />
                                <label className="custom-control-label" htmlFor="violin"> Violin </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="drums" id="drums" />
                                <label className="custom-control-label" htmlFor="drums"> Drums </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="trumpet" id="trumpet" />
                                <label className="custom-control-label" htmlFor="trumpet"> Trumpet </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="location"> Location: </label>
                            <select id="location" className="form-control"  >
                                <option value="not_selected">Select Location</option>
                                <option value="belgrade"> Belgrade </option>
                                <option value="noviSad"> Novi Sad </option>
                                <option value="nis"> Niš </option>
                                <option value="kragujevac"> Kragujevac </option>
                                <option value="subotica"> Subotica </option>
                                <option value="pristina"> Priština </option>
                                <option value="pancevo"> Pančevo </option>
                                <option value="loznica"> Loznica </option>
                                <option value="zrenjanin"> Zrenjanin </option>
                                <option value="cacak"> Čačak </option>
                                <option value="krusevac"> Kruševac </option>
                                <option value="kraljevo"> Kraljevo </option>
                                <option value="noviPazar"> Novi Pazar </option>
                                <option value="smederevo"> Smederevo </option>
                                <option value="leskovac"> Leskovac </option>
                                <option value="uzice"> Užice </option>
                                <option value="vranje"> Vranje </option>
                                <option value="valjevo"> Valjevo </option>
                                <option value="sabac"> Šabac </option>
                                <option value="sombor"> Sombor </option>
                                <option value="pozarevac"> Požarevac </option>
                                <option value="pirot"> Pirot </option>
                                <option value="zajecar"> Zaječar </option>
                                <option value="kikinda"> Kikinda </option>
                                <option value="sremskaMitrovica"> Sremska Mitrovica </option>
                                <option value="jagodina"> Jagodina </option>
                                <option value="vrsac"> Vršac </option>
                                <option value="bor"> Bor </option>
                                <option value="prokuplje"> Prokuplje </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description"> Profile description: </label>
                            <textarea className="form-control"
                                id="description"
                                rows="5"></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="type"> I will use this account for: </label>
                            <select id="type" className="form-control" >
                                <option value="not_selected"> Select type </option>
                                <option value="proffesional"> Earning money! </option>
                                <option value="hobby"> Fun! </option>
                            </select>
                        </div>

                        <button type="button" onClick={this.handleConfigureMusician} className="btn btn-success"> Save changes </button>
                        <span> </span>
                        <button type="button" onClick={this.deleteAccount} className="btn btn-danger"> Delete account </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ConfigureMusicianProfile;