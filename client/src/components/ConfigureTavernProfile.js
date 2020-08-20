import React, { Component } from 'react';
import axios from 'axios';
import '../css/ConfigureProfile.css';
import Header from './Header';

class ConfigureTavernProfile extends Component {
    constructor(props) {
        super(props);

        this.handleConfigureTavern = this.handleConfigureTavern.bind(this);
    }

    handleConfigureTavern = async event => {
        const forTavern = this.getValues();
        // event.preventDefault();

        let isValid = this.checkValidity(forTavern);
        if (!isValid) {
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
            // window.alert("Something is wrong!");
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
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description"> Profile description: </label>
                            <textarea className="form-control"
                                id="description"
                                rows="5"></textarea>
                        </div>

                        <button type="button" onClick={this.handleConfigureTavern} className="btn btn-success"> Save changes </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ConfigureTavernProfile;