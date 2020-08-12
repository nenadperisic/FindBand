import React, { Component } from 'react';
import axios from 'axios';
import '../css/ViewProfileMusician.css';
import Header from './Header';

class BandProfile extends Component {
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
        // document.getElementById("").reset();
        // window.location.href = "/musicianProfile";
    }

    render() {

        return (
            <div className="profile">
                <Header />
                <div className="container" id="musicianAccount">
                    <h2> Your profile: Band </h2>
                    <button type="button" onClick={this.handleSubmitforAccount} className="btn btn-success"> Configure profile </button>
                </div>
            </div>
        );
    }
}

export default BandProfile;