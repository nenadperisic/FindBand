import React, { Component } from 'react';
import axios from 'axios';
import '../css/MusicianProfile.css';
import Header from './Header';

class MusicianProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forAccount: {
                age: ''
            }
        };

        this.showFormforAccount = this.showFormforAccount.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
        this.handleSubmitforAccount = this.handleSubmitforAccount.bind(this);

    }

    showFormforAccount() {
        const formAccount = document.getElementById("musicianAccount");
        formAccount.style.display = "block";
        this.setState({
            forAccount: {
                age: ''
            }
        });
    }

    checkFormValidity(entity) {
        const validationEmailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
        const validationPasswordRegex = new RegExp("^(?=.*\\d).{4,12}$");

        if (entity.accountType === "" || entity.accountType === "not_selected") {
            window.alert("Account type not selected!");
            return false;
        } else if (entity.email === "" || !validationEmailRegex.test(entity.email)) {
            window.alert("Please insert valid email!");
            return false;
        } else if (entity.password === "" || !validationPasswordRegex.test(entity.password)) {
            window.alert("Password must contain between 4-12 characters and at least one digit!");
            return false;
        }

        return true;
    }

    onAgeChange(age) {
        const forAccount = {
            age: age.target.value,
        }
        this.setState({
            forAccount
        });
    }

    handleSubmitforAccount = async event => {
        const forAccount = this.state.forAccount;
        // event.preventDefault();

        try {
            // const response = /* await */ axios.post('http://localhost:5000/api/user/musicianProfile', { email: localStorage.email });
            const response = /* await */ axios.post('http://localhost:5000/api/user/musicianProfile', { email: localStorage.email, age: forAccount.age });
            console.log("musicianProfile response:");
            console.log(localStorage.email);
            console.log(response.forAccount);
            localStorage.setItem("age", forAccount);
        } catch (e) {
            // console.log(e.response.data.message);
            window.alert("Something is wrong!");
        }

        // console.log(forAccount);
        // document.getElementById("musicianAccountForm").reset();
    }

    render() {

        return (
            <div className="profile">
                <Header />
                <div className="container" id="musicianAccount">
                    <form id="musicanAccountForm">
                        <h2> Configure your profile </h2>

                        <div className="form-group">
                            <label htmlFor="age"> Age: </label>
                            <input type="textarea" className="form-control" id="age" placeholder="Enter age" name="age" onChange={this.onAgeChange} />
                        </div>

                        <button type="button" onClick={this.handleSubmitforAccount} className="btn btn-success"> Done </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default MusicianProfile;