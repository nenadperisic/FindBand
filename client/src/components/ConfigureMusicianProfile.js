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
                    await axios.post(
                        'http://localhost:5000/api/user/profile/deleteAccount',
                        { email: localStorage.email }
                    ).then(res => {
                        console.log(res.status);
                    });

                    window.alert("account deleted successfully!");

                    localStorage.clear();
                    window.location.href = "/";
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    handleConfigureMusician = async event => {
        let forAccount = this.getValues();

        let isValid = this.checkValidity(forAccount);
        if (!isValid) {
            return ;
        }

        let confirm = window.confirm("Are you sure you want to edit your account?");
        if (!confirm) {
            return ;
        }

        try {
            await axios.post(
                'http://localhost:5000/api/user/configure/musician', 
                { 
                    email: localStorage.email,
                    name: forAccount.name,
                    dateOfBirth: forAccount.dateOfBirth,
                    gender: forAccount.gender,
                    genres: forAccount.genres,
                    instruments: forAccount.instruments,
                    location: forAccount.location,
                    description: forAccount.description,
                    professionalAccount: forAccount.professionalAccount
                }
            ).then(res => {
                console.log(res.status);
            });

            window.alert("Account updated successfully!");
            window.location.href = "/profile/musician";
        } catch (e) {
            console.log(e);
        }

        document.getElementById("musicianAccountForm").reset();

        // every checkbox needs to be separately unchecked
        document.getElementById("Pop").checked = false;
        document.getElementById("Rock").checked = false;
        document.getElementById("Jazz").checked = false;
        document.getElementById("Metal").checked = false;
        document.getElementById("Folk").checked = false;
        document.getElementById("Voice").checked = false;
        document.getElementById("Guitar").checked = false;
        document.getElementById("Bass Guitar").checked = false;
        document.getElementById("Piano").checked = false;
        document.getElementById("Violin").checked = false;
        document.getElementById("Drums").checked = false;
        document.getElementById("Trumpet").checked = false;
    }

    checkValidity(account) {
        let dateOfBirth = new Date(account.dateOfBirth);
        let currentDate = new Date();
        let currentYear = Number.parseInt(currentDate.getFullYear());

        let thresholdYear = currentYear - 16;
        let thresholdDate = new Date(thresholdYear + currentDate.toISOString().slice(4, 10));

        if (account.name === "") {
            window.alert("Please insert username!");
            return false;
        } else if (account.dateOfBirth === "" || !account.dateOfBirth) {
            window.alert("Please insert your date of birth!");
            return false;
        } else if (dateOfBirth.getTime() > thresholdDate.getTime()) {
            window.alert("You must be older than 16 years old!");
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
        values.gender = document.getElementById('select-gender-configure').value;
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
            document.getElementById('select-gender-configure').value = !user.gender ? "male" : user.gender;

            for (let genre of user.genres) {
                document.getElementById(genre).checked = true;
            }

            for (let instrument of user.instruments) {
                document.getElementById(instrument).checked = true;
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.setValues();
    }

    render() {
        return (
            <div className="profile">
                <Header />
                <div className="container" style={{ paddingTop: '70px', paddingBottom: '50px' }}>

                    <div className="card">
                    <div className="card-body">

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
                            <label htmlFor="select-gender-configure"> Gender: </label>
                            <select id="select-gender-configure" className="form-control" disabled>
                                <option value="male"> Male </option>
                                <option value="female"> Female </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label> Select genre: </label> <br/>
                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input genre-select" value="Pop" id="Pop" />
                                <label className="custom-control-label" htmlFor="Pop"> Pop </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input genre-select" value="Rock" id="Rock" />
                                <label className="custom-control-label" htmlFor="Rock"> Rock </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input genre-select" value="Jazz" id="Jazz" />
                                <label className="custom-control-label" htmlFor="Jazz"> Jazz </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input genre-select" value="Metal" id="Metal" />
                                <label className="custom-control-label" htmlFor="Metal"> Metal </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input genre-select" value="Folk" id="Folk" />
                                <label className="custom-control-label" htmlFor="Folk"> Folk </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label> Select instruments: </label> <br/>
                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="Voice" id="Voice" />
                                <label className="custom-control-label" htmlFor="Voice"> Voice </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="Guitar" id="Guitar" />
                                <label className="custom-control-label" htmlFor="Guitar"> Guitar </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="Bass Guitar" id="Bass Guitar" />
                                <label className="custom-control-label" htmlFor="Bass Guitar"> Bass Guitar </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="Piano" id="Piano" />
                                <label className="custom-control-label" htmlFor="Piano"> Piano </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="Violin" id="Violin" />
                                <label className="custom-control-label" htmlFor="Violin"> Violin </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="Drums" id="Drums" />
                                <label className="custom-control-label" htmlFor="Drums"> Drums </label>
                            </div>

                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" className="custom-control-input instrument-select" value="Trumpet" id="Trumpet" />
                                <label className="custom-control-label" htmlFor="Trumpet"> Trumpet </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="location"> Location: </label>
                            <select id="location" className="form-control" >
                                <option value="not_selected"> Select Location </option>
                                <option value="Belgrade" > Belgrade </option>
                                <option value="Bor" > Bor </option>
                                <option value="Čačak" > Čačak </option>
                                <option value="Jagodina" > Jagodina </option>
                                <option value="Kikinda" > Kikinda </option>
                                <option value="Kragujevac" > Kragujevac </option>
                                <option value="Kraljevo" > Kraljevo </option>
                                <option value="Kruševac" > Kruševac </option>
                                <option value="Leskovac" > Leskovac </option>
                                <option value="Loznica" > Loznica </option>
                                <option value="Niš" > Niš </option>
                                <option value="Novi Pazar" > Novi Pazar </option>
                                <option value="Novi Sad" > Novi Sad </option>
                                <option value="Pančevo" > Pančevo </option>
                                <option value="Pirot" > Pirot </option>
                                <option value="Požarevac" > Požarevac </option>
                                <option value="Priština" > Priština </option>
                                <option value="Prokuplje" > Prokuplje </option>
                                <option value="Šabac" > Šabac </option>
                                <option value="Smederevo" > Smederevo </option>
                                <option value="Sombor" > Sombor </option>
                                <option value="Sremska Mitrovica" > Sremska Mitrovica </option>
                                <option value="Subotica" > Subotica </option>
                                <option value="Užice" > Užice </option>
                                <option value="Valjevo" > Valjevo </option>
                                <option value="Vranje" > Vranje </option>
                                <option value="Vršac" > Vršac </option>
                                <option value="Zaječar" > Zaječar </option>
                                <option value="Zrenjanin" > Zrenjanin </option>
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

                </div>
            </div>
        );
    }
}

export default ConfigureMusicianProfile;