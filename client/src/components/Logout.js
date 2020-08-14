import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forAccount: {

            }
        };

        this.Logout = this.Logout.bind(this);
    }

    Logout = async event => {
        const forAccount = this.state.forAccount;
        try {
            /* await */ axios.post('http://localhost:5000/api/user/logout', { email: localStorage.email} );
        } catch (e) {
            // console.log(e.response.data.message);
            window.alert("Something is wrong!");
        }
        localStorage.setItem("token", null);
        localStorage.setItem("email", null);
    }

    render() {

        return (
            <div className="profile">
                <Header />
                <div className="container" id="musicianAccount">
                    <h2> Logout </h2>

                    <button type="button" onClick={this.Logout} className="btn btn-success"> Logout </button>
                </div>
            </div>
        );
    }
}

export default Logout;