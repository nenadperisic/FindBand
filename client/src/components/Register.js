import React, { Component } from 'react';
import axios from 'axios';
import '../css/Register.css';
import Header from './Header';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forAccount: {
                accountType: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        };
    
        this.showFormforAccount = this.showFormforAccount.bind(this);
        this.onAccountTypeChange = this.onAccountTypeChange.bind(this);
        this.onEmailChangeforAccount = this.onEmailChangeforAccount.bind(this);
        this.onPasswordChangeforAccount = this.onPasswordChangeforAccount.bind(this);
        this.onPasswordConfirmChangeforAccount = this.onPasswordConfirmChangeforAccount.bind(this);
        this.handleSubmitforAccount = this.handleSubmitforAccount.bind(this);

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
        } else if (entity.password !== entity.confirmPassword) {
            window.alert("Passwords do not match!");
            return false;
        }

        return true;
    }

    showFormforAccount() {
        const formAccount = document.getElementById("registerAccount");
        formAccount.style.display = "block";
        this.setState({
            forAccount: {
                accountType: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        });
    }

    onEmailChangeforAccount(email) {
        const forAccount = {
            accountType: this.state.forAccount.accountType,
            email: email.target.value,
            password: this.state.forAccount.password,
            confirmPassword: this.state.forAccount.confirmPassword
        }
        this.setState({
            forAccount
        });
    }

    onPasswordChangeforAccount(password) {
        const forAccount = {
            accountType: this.state.forAccount.accountType,
            email: this.state.forAccount.email,
            password: password.target.value,
            confirmPassword: this.state.forAccount.confirmPassword
        };
        this.setState({
            forAccount
        });
    }

    onPasswordConfirmChangeforAccount(passwordConfirm) {
        const forAccount = {
            accountType: this.state.forAccount.accountType,
            email: this.state.forAccount.email,
            password: this.state.forAccount.password,
            confirmPassword: passwordConfirm.target.value
        };
        this.setState({
            forAccount
        });
    }

    onAccountTypeChange(accountFor) {
        // console.log(accountFor.target.value);
        const forAccount = {
            accountType: accountFor.target.value,
            email: this.state.forAccount.email,
            password: this.state.forAccount.password,
            confirmPassword: this.state.forAccount.confirmPassword
        }
        this.setState({
            forAccount
        });
    }



    handleSubmitforAccount = async event => {
        const forAccount = this.state.forAccount;
        if (!this.checkFormValidity(forAccount)) {
            return;
        }
        try {
            /* await */ axios.post('/api/user/register', forAccount);
            // console.log(forAccount);
            // const { token } = response.data;
            // localStorage.setItem("token", token);
            localStorage.setItem("email", forAccount.email);
            console.log("Registration success");
            document.getElementById("formAccount").reset();
            window.location.href = "/musicianProfile";
        } catch (e) {
            window.alert("Account with this email already exists!");
            // console.log(e.response.data.message)
        }        
    }

    render() {

        return (
            <div className="signin">
                <Header />
                <div className="container" id="registerAccount">
                    <h2>Register</h2>
                    <div className="form-group">
                        <label htmlFor="accountFor">Account for:</label>
                        <select id="selectAccountType" className="form-control" onChange={this.onAccountTypeChange} selected="musician">
                            <option value="not_selected">Select account type</option>
                            <option value="musician">Musician</option>
                            <option value="band">Band</option>
                            <option value="tavern">Tavern</option>
                        </select>
                    </div>

                    <form id="formAccount">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={this.onEmailChangeforAccount}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="pwd">Password:</label>
                            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" onChange={this.onPasswordChangeforAccount}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="pwd">Confirm password:</label>
                            <input type="password" className="form-control" id="pwdConfirm" placeholder="Enter password" name="pwd" onChange={this.onPasswordConfirmChangeforAccount}/>
                        </div>

                        <button type="button" onClick={this.handleSubmitforAccount} className="btn btn-success"> Register </button>
                    </form>
                </div>
            </div>
    );
  }
}

export default Register;