import React, { Component } from 'react';
import axios from 'axios';
import '../css/ConfigureProfile.css';
import Header from './Header';

class ConfigureBandProfile extends Component {
    constructor(props) {
        super(props);

        this.handleConfigureBand = this.handleConfigureBand.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.addMember = this.addMember.bind(this);
        this.removeMember = this.removeMember.bind(this);
        this.submitMembers = this.submitMembers.bind(this);

        this.bandMembers = [];
        this.toBeAdded = [];
        this.toBeRemoved = [];
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
                    console.log(e);
                }
            }
        }
    }

    handleConfigureBand = async event => {
        const forBand = this.getValues();
        // event.preventDefault();

        let isValid = this.checkValidity(forBand);
        if (!isValid) {
            return ;
        }

        let confirm = window.confirm("Are you sure you want to edit your account?");
        if (!confirm) {
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
                    professionalAccount: forBand.professionalAccount
                });

            console.log("bandProfile response:");
            console.log(localStorage.email);
            // console.log(response.forBand);
            localStorage.setItem("name", forBand);
            localStorage.setItem("genre", forBand);

            window.alert("Account updated successfully!");
            window.location.href = "/profile/band";
        } catch (e) {
            console.log(e);
        }

        document.getElementById("bandAccountForm").reset();

        // every checkbox needs to be separately
        document.getElementById("Pop").checked = false;
        document.getElementById("Rock").checked = false;
        document.getElementById("Jazz").checked = false;
        document.getElementById("Metal").checked = false;
        document.getElementById("Folk").checked = false;
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

            this.bandMembers = !user.bandMembers ? [] : user.bandMembers;
        } catch (e) {
            console.log(e);
        }

        this.forceUpdate();
    }

    componentDidMount() {
        this.setValues();
    }

    addMember = async event => {
        let value = document.getElementById("new-member-email").value;

        const validationEmailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
        if (value === "" || !validationEmailRegex.test(value)) {
            window.alert("Please insert valid email for new member!");
            return ;
        } else if (this.bandMembers.indexOf(value) !== -1) {
            window.alert("User is already bend member!");
            return ;
        }

        try {
            let result = await axios.post(
                'http://localhost:5000/api/user/musician/exists',
                { 
                    email: value
                }
            );

            const indicator = result.data.indicator;
            if (!indicator) {
                window.alert("Musician with that email does not exist!");
                return ;
            }
        } catch (e) {
            console.log(e);
        }

        this.bandMembers.push(value);
        this.toBeAdded.push(value);

        document.getElementById("new-member-email").value = "";

        this.forceUpdate();
    }

    removeMember() {
        let value = document.getElementById("remove-member-email").value;

        if (value === "not_selected") {
            window.alert("Select email member first!");
            return ;
        }

        this.bandMembers = this.bandMembers.filter(e => e !== value);
        this.toBeRemoved.push(value);

        this.forceUpdate();
    }

    submitMembers = async event => {
        let confirm = window.confirm("Are you sure you want to update your member list?");
        if (!confirm) {
            return ;
        }

        let emailsToBeRemoved = 
            Array.from(document.getElementsByClassName("member-emails-class"))
                .filter(e => e.checked)
                .map(e => e.id);

        let survivors = this.bandMembers.filter(e => !emailsToBeRemoved.includes(e));
        try {
            /* await */ axios.post(
                'http://localhost:5000/api/user/update/member/list',
                { 
                    email: localStorage.email,
                    bandMembers: survivors
                }
            );
        } catch (e) {
            console.log(e);
        }

        window.alert("List of band members updated successfully!");
        window.location.href = "/profile/band";

        document.getElementById("band-members-form").reset();
    }

    render() {
        let addedMembers = [];
        for (const email of this.toBeAdded) {
            addedMembers.push(<li key={email}> {email} </li>)
        }

        let memberEmails = [];
        for (let i = 0; i < this.bandMembers.length; ++i) {
            memberEmails.push(
                <div key={i}>
                    <input className="form-check-input member-emails-class" id={this.bandMembers[i]} type="checkbox" />
                    <label className="form-check-label">
                        {this.bandMembers[i]}
                    </label>
                </div>
            );
        }

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
                            <label htmlFor="type"> We will use this account for: </label>
                            <select id="type" className="form-control" >
                                <option value="not_selected"> Select type </option>
                                <option value="proffesional"> Earning money! </option>
                                <option value="hobby"> Fun! </option>
                            </select>
                        </div>

                        <button type="button" onClick={this.handleConfigureBand} className="btn btn-success"> Save changes </button>
                        <span> </span>
                        <button type="button" onClick={this.deleteAccount} className="btn btn-danger"> Delete account </button>
                    </form>
                </div>

                <div className="container">
                    <form id="band-members-form">
                        <h2> Add and Remove band members </h2>

                        <div className="form-group">
                            <label htmlFor="new-member-email"> Add new member </label>
                            <div className="input-group">
                            <input type="text" id="new-member-email" className="form-control" placeholder="Enter email of a new member"/>
                                <div className="input-group-append">
                                    <button className="btn btn-success" onClick={this.addMember} type="button"> Add Member </button>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor=""> To be added: </label>
                            {addedMembers}
                        </div>

                        <div className="form-group">
                            <label> Select members you want to remove from band: </label>
                            <div className="form-check">
                                {memberEmails}
                            </div>
                        </div>

                        <button type="button" onClick={this.submitMembers} className="btn btn-success"> Submit changes </button>
                    </form>
                </div>
                
            </div>
        );
    }
}

export default ConfigureBandProfile;