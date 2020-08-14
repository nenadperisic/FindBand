import React, { Component } from 'react';
import axios from 'axios';
import '../css/Login.css';
import Header from './Header';

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            forAccount: {
                accountType: '',
                email: '',
                password: ''
            }
        };
        
        this.showFormforAccount = this.showFormforAccount.bind(this);
        this.onAccountTypeChange = this.onAccountTypeChange.bind(this);
        this.onEmailChangeforAccount = this.onEmailChangeforAccount.bind(this);
        this.onPasswordChangeforAccount = this.onPasswordChangeforAccount.bind(this);
        this.handleSubmitforAccount = this.handleSubmitforAccount.bind(this);
        this.setUser = this.setUser.bind(this);

    }
    setUser(user, newUser) {
        user.setState(newUser);
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

    showFormforAccount() {
        const formAccount = document.getElementById("registerAccount");
        formAccount.style.display = "block";
        this.setState({
            forAccount: {
                accountType: '',
                email: '',
                password: ''
            }
        });
    }

    onEmailChangeforAccount(email) {
        const forAccount = {
            accountType: this.state.forAccount.accountType,
            email: email.target.value,
            password: this.state.forAccount.password
        }
        this.setState({
            forAccount
        });
    }

    onPasswordChangeforAccount(password) {
        const forAccount = {
            accountType: this.state.forAccount.accountType,
            email: this.state.forAccount.email,
            password: password.target.value
        };
        this.setState({
            forAccount
        });
    }

    onAccountTypeChange(accountFor) {
        const forAccount = {
            accountType: accountFor.target.value,
            email: this.state.forAccount.email,
            password: this.state.forAccount.password
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
            const response = await axios.post('/api/user/login', forAccount);
            const {token} = response.data;
            console.log("uspesan log in");
            localStorage.setItem("token", token);
            localStorage.setItem("email", forAccount.email)
            localStorage.setItem("accountType", forAccount.accountType)
            console.log(localStorage.email)
        } catch (e) {
            // console.log(e.response.data.message);
            window.alert(e.response.data.message);
        }

        // console.log(forAccount);
        // document.getElementById("formAccount").reset();
    }

    render() {
        // const { user, setUser } = this.context;
        return (
            
            <div className="login">
                <Header />
                <div className="container" id="loginAccount">
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="accountFor">Account for:</label>
                        <select id="selectAccountType" className="form-control" onChange={this.onAccountTypeChange}>
                            <option value="not_selected">Select account type</option>
                            <option value="musician">Musician</option>
                            <option value="band">Band</option>
                            <option value="tavern">Tavern</option>
                        </select>
                    </div>

                    <form id="formAccount">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={this.onEmailChangeforAccount} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pwd">Password:</label>
                            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" onChange={this.onPasswordChangeforAccount} />
                        </div>

                        <button type="button" onClick={this.handleSubmitforAccount} className="btn btn-success">Log in</button>
                    </form>
                </div>
            </div>
        
        );
    }
}

export default Login;