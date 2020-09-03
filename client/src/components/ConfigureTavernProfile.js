import React, { Component } from 'react';
import axios from 'axios';
import '../css/ConfigureProfile.css';
import Header from './Header';

class ConfigureTavernProfile extends Component {
    constructor(props) {
        super(props);

        this.handleConfigureTavern = this.handleConfigureTavern.bind(this);
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

    handleConfigureTavern = async event => {
        const forTavern = this.getValues();
        // event.preventDefault();

        let isValid = this.checkValidity(forTavern);
        if (!isValid) {
            return ;
        }

        let confirm = window.confirm("Are you sure you want to edit your account?");
        if (!confirm) {
            return ;
        }

        try {
            /* await */ axios.post(
                'http://localhost:5000/api/user/configure/tavern',
                {
                    email: localStorage.email,
                    name: forTavern.name,
                    tavernType: forTavern.tavernType,
                    location: forTavern.location,
                    description: forTavern.description,
                });

            localStorage.setItem("name", forTavern);
            localStorage.setItem("genre", forTavern);

            window.alert("Account updated successfully!");
            window.location.href = "/profile/tavern";
        } catch (e) {
            console.log(e.response.data.message);
            window.alert("Something is wrong!");
        }

        document.getElementById("tavernAccountForm").reset();
    }

    checkValidity(account) {
        if (account.name === "") {
            window.alert("Please insert tavern name!");
            return false;
        } else if (account.tavernType === "not_selected") {
            window.alert("Please select tavern type!");
            return false;
        } else if (account.location === "not_selected") {
            window.alert("Please select location!");
            return false;
        } 

        return true;
    }

    getValues() {
        let values = {};
        values.name = document.getElementById('name').value;
        values.location = document.getElementById('location').value;
        values.description = document.getElementById('description').value;
        values.tavernType = document.getElementById('type').value;

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
            document.getElementById('type').value = !user.tavernType ? "not_selected" : user.tavernType;
            document.getElementById('location').value = !user.location ? "not_selected" : user.location;

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
                    <form id="tavernAccountForm">
                        <h2> Configure your profile </h2>

                        <div className="form-group">
                            <label htmlFor="name"> Name of the place: </label>
                            <input type="textarea" className="form-control" id="name" placeholder="Enter name" name="name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type"> Type: </label>
                            <select id="type" className="form-control" >
                                <option value="not_selected"> Select type </option>
                                <option value="pub"> Pub </option>
                                <option value="restaurant"> Restaurant </option>
                                <option value="nightclub"> Nightclub </option>
                            </select>
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

                        <button type="button" onClick={this.handleConfigureTavern} className="btn btn-success"> Save changes </button>
                        <span> </span>
                        <button type="button" onClick={this.deleteAccount} className="btn btn-danger"> Delete account </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ConfigureTavernProfile;