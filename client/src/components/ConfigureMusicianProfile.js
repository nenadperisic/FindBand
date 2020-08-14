import React, { Component } from 'react';
import axios from 'axios';
import '../css/ConfigureProfile.css';
import Header from './Header';

class ConfigureMusicianProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forAccount: {
                age: ''
            }
        };

        this.onAgeChange = this.onAgeChange.bind(this);
        this.handleConfigureMusician = this.handleConfigureMusician.bind(this);
    }

    onAgeChange(age) {
        const forAccount = {
            age: age.target.value,
        }
        this.setState({
            forAccount
        });
    }

    handleConfigureMusician = async event => {
        const forAccount = this.state.forAccount;
        // event.preventDefault();

        try {
            const response = /* await */ axios.post('http://localhost:5000/api/user/configure/musician', { email: localStorage.email, age: forAccount.age });
            console.log("musicianProfile response:");
            console.log(localStorage.email);
            console.log(response.forAccount);
            localStorage.setItem("age", forAccount);
        } catch (e) {
            // console.log(e.response.data.message);
            window.alert("Something is wrong!");
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
                            <label htmlFor="age"> Age: </label>
                            <input type="textarea" className="form-control" id="age" placeholder="Enter age" name="age" onChange={this.onAgeChange} />
                        </div>

                        <button type="button" onClick={this.handleConfigureMusician} className="btn btn-success"> Save changes </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ConfigureMusicianProfile;