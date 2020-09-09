import React, { Component } from 'react';
import axios from 'axios';
import '../css/Login.css';
import Header from './Header';

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            forAccount: {
                email: '',
                password: ''
            }
        };
        
        this.onEmailChangeforAccount = this.onEmailChangeforAccount.bind(this);
        this.onPasswordChangeforAccount = this.onPasswordChangeforAccount.bind(this);
        this.handleSubmitforAccount = this.handleSubmitforAccount.bind(this);
        this.setUser = this.setUser.bind(this);

    }

    setUser(user, newUser) {
        user.setState(newUser);
    }

    onEmailChangeforAccount(email) {
        const forAccount = {
            email: email.target.value,
            password: this.state.forAccount.password
        }
        this.setState({
            forAccount
        });
    }

    onPasswordChangeforAccount(password) {
        const forAccount = {
            email: this.state.forAccount.email,
            password: password.target.value
        };
        this.setState({
            forAccount
        });
    }

    checkFormValidity(entity) {
        const validationEmailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
        const validationPasswordRegex = new RegExp("^(?=.*\\d).{4,12}$");

        if (entity.email === "" || !validationEmailRegex.test(entity.email)) {
            window.alert("Please insert valid email!");
            return false;
        } else if (entity.password === "" || !validationPasswordRegex.test(entity.password)) {
            window.alert("Password must contain between 4-12 characters and at least one digit!");
            return false;
        }

        return true;
    }

    handleSubmitforAccount = async event => {
        const forAccount = this.state.forAccount;
        if (!this.checkFormValidity(forAccount)) {
            return;
        }

        console.log(forAccount);

        try {
            const response = await axios.post('/api/user/login', forAccount);
            const {user, token} = response.data;            

            console.log("uspesan log in");
            localStorage.setItem("token", token);
            localStorage.setItem("email", forAccount.email)
            localStorage.setItem("contactEmail", forAccount.email);
            localStorage.setItem("accountType", user.accountType)
            console.log(localStorage.email)

            const target = "/profile/" + user.accountType;
            window.location.href = target;
        } catch (e) {
            // console.log(e.response.data.message);
            window.alert("Account with that email does not exist!");
        }

        // console.log(forAccount);
        // document.getElementById("formAccount").reset();
    }

    render() {
        // const { user, setUser } = this.context;
        return (
            <div className="login">
                <Header />
                <div className="container" id="loginAccount" style={{paddingTop: '6%'}}>

                <div className="row">

                    <div className="col-lg-3">
                    </div>

                    <div className="card col-lg-6">
                        <div className="card-body">

                            <h2>Login</h2>

                            <form id="formAccount">
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={this.onEmailChangeforAccount} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pwd">Password:</label>
                                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" onChange={this.onPasswordChangeforAccount} />
                                </div>

                                <div className="text-center">
                                    <button type="button" onClick={this.handleSubmitforAccount} className="btn btn-success">Log in</button>
                                </div>
                            </form>

                        </div>
                    </div>

                    <div className="col-lg-3">
                    </div>

                    </div>
                </div>
            </div>
        
        );
    }
}

export default Login;