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
                dateOfBirth: '',
                password: '',
                confirmPassword: ''
            }
        };
    
        this.showFormforAccount = this.showFormforAccount.bind(this);
        this.onAccountTypeChange = this.onAccountTypeChange.bind(this);
        this.onEmailChangeforAccount = this.onEmailChangeforAccount.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onPasswordChangeforAccount = this.onPasswordChangeforAccount.bind(this);
        this.onPasswordConfirmChangeforAccount = this.onPasswordConfirmChangeforAccount.bind(this);
        this.handleSubmitforAccount = this.handleSubmitforAccount.bind(this);

    }
    
    checkFormValidity(entity) {
        const validationEmailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
        const validationPasswordRegex = new RegExp("^(?=.*\\d).{4,12}$");

        let dateOfBirth = new Date(entity.dateOfBirth);
        let currentDate = new Date();
        let currentYear = Number.parseInt(currentDate.getFullYear());

        let thresholdYear = currentYear - 16;
        let thresholdDate = new Date(thresholdYear + currentDate.toISOString().slice(4, 10));
        
        if (entity.accountType === "" || entity.accountType === "not_selected") {
            window.alert("Account type not selected!");
            return false;
        } else if (entity.email === "" || !validationEmailRegex.test(entity.email)) {
            window.alert("Please insert valid email!");
            return false;
        } else if (!entity.dateOfBirth && entity.accountType === "musician") {
            window.alert("Please insert date of birth!");
            return false;
        } else if (dateOfBirth.getTime() > thresholdDate.getTime() && entity.accountType === "musician") {
            window.alert("You must be older than 16 years old!");
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
                dateOfBirth: '',
                password: '',
                confirmPassword: ''
            }
        });
    }

    onEmailChangeforAccount(email) {
        const forAccount = {
            accountType: this.state.forAccount.accountType,
            email: email.target.value,
            dateOfBirth: this.state.forAccount.dateOfBirth,
            password: this.state.forAccount.password,
            confirmPassword: this.state.forAccount.confirmPassword
        }
        this.setState({
            forAccount
        });
    }

    onDateChange(date) {
        const forAccount = {
            accountType: this.state.forAccount.accountType,
            email: this.state.forAccount.email,
            dateOfBirth: date.target.value,
            password: this.state.forAccount.password,
            confirmPassword: this.state.forAccount.confirmPassword
        };

        this.setState({
            forAccount
        })
    }

    onPasswordChangeforAccount(password) {
        const forAccount = {
            accountType: this.state.forAccount.accountType,
            email: this.state.forAccount.email,
            dateOfBirth: this.state.forAccount.dateOfBirth,
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
            dateOfBirth: this.state.forAccount.dateOfBirth,
            password: this.state.forAccount.password,
            confirmPassword: passwordConfirm.target.value
        };
        this.setState({
            forAccount
        });
    }

    onAccountTypeChange(accountFor) {
        if (accountFor.target.value === "musician") {
            document.getElementById("date-of-birth-reg-group").style.display = "block";
        } else {
            document.getElementById("date-of-birth-reg-group").style.display = "none";
        }

        const forAccount = {
            accountType: accountFor.target.value,
            email: this.state.forAccount.email,
            dateOfBirth: this.state.forAccount.dateOfBirth,
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
            const verify = await axios.post('/api/user/send', {email: forAccount.email});
        } catch (e) {
            window.alert("cannot send email!");
        }

        try {
            const response = /* await */ axios.post('/api/user/register', forAccount);

            localStorage.setItem("email", forAccount.email);
            localStorage.setItem("accountType", forAccount.accountType);
            
            console.log("Registration success");
            
            document.getElementById("formAccount").reset();
            window.location.href = "/verify";

            // const accountType = "/configure/" + forAccount.accountType;
            // console.log(accountType);
            // window.location.href = accountType;
        } catch (e) {
            window.alert("Account with this email already exists!");
            // console.log(e.response.data.message)
        }
        // this.forceUpdate();
    }

    render() {

        return (
            <div className="signin">
                <Header />
                <div className="container" id="registerAccount">
                    <h2>Register</h2>

                    <form id="formAccount">
                        <div className="form-group">
                            <label htmlFor="accountFor">Account for:</label>
                            <select id="selectAccountType" className="form-control" onChange={this.onAccountTypeChange} selected="musician">
                                <option value="not_selected">Select account type</option>
                                <option value="musician">Musician</option>
                                <option value="band">Band</option>
                                <option value="tavern">Tavern</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={this.onEmailChangeforAccount}/>
                        </div>

                        <div className="form-group" id="date-of-birth-reg-group" style={{display: "none"}}>
                            <label htmlFor="dateOfBirth"> Date of birth: </label>
                            <input type="date" 
                                className="form-control" 
                                id="date-of-birth-register" 
                                name="dateOfBirth" 
                                onChange={this.onDateChange}/>
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