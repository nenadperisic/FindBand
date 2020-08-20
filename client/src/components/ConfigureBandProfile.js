import React, { Component } from 'react';
import axios from 'axios';
import '../css/ConfigureProfile.css';
import Header from './Header';

class ConfigureBandProfile extends Component {
    constructor(props) {
        super(props);

        this.handleConfigureBand = this.handleConfigureBand.bind(this);
    }

    handleConfigureBand = async event => {
        const forBand = this.getValues();
        // event.preventDefault();

        let isValid = this.checkValidity(forBand);
        if (!isValid) {
            return ;
        }

        try {
            /* await */ axios.post(
                'http://localhost:5000/api/user/configure/band',
                {
                    email: localStorage.email,
                    name: forBand.name,
                    genres: forBand.genres,
                    location: forBand.location,
                    description: forBand.description,
                    professionalAccount: forBand.accountType
                });

            console.log("bandProfile response:");
            console.log(localStorage.email);
            // console.log(response.forBand);
            localStorage.setItem("name", forBand);
            localStorage.setItem("genre", forBand);

            window.alert("Account updated successfully!");
            window.location.href = "/profile/band";
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

    checkValidity(account) {
        if (account.name === "") {
            window.alert("Please insert band name!");
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
        values.location = document.getElementById('location').value;
        values.professionalAccount = document.getElementById('type').value;
        values.description = document.getElementById('description').value;
        values.genres = [];

        let genres = Array.from(document.getElementsByClassName("genre-select")).map(tag => tag.id);
        for (let genre of genres) {
            if (document.getElementById(genre).checked) {
                values.genres.push(genre);
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
            document.getElementById('description').value = !user.description ? "" : user.description;
            document.getElementById('location').value = !user.location ? "not_selected" : user.location;
            document.getElementById('type').value = !user.professionalAccount ? "not_selected" : user.professionalAccount;

            for (let genre of user.genres) {
                document.getElementById(genre).checked = true;
            }

        } catch (e) {
            console.log(e.response.data.message);
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
                    <form id="bandAccountForm">
                        <h2> Configure your profile </h2>

                        <div className="form-group">
                            <label htmlFor="name"> Band name: </label>
                            <input type="textarea" className="form-control" id="name" placeholder="Enter band name" name="name" />
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
                            <label htmlFor="location"> Location: </label>
                            <select id="location" className="form-control" >
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
                                rows="5"></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="type"> We will use this account for: </label>
                            <select id="type" className="form-control" >
                                <option value="not_selected"> Select type </option>
                                <option value="proffesional"> Earning money! </option>
                                <option value="hobby"> Fun! </option>
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