import React, { Component } from 'react';
import axios from 'axios';
import '../css/Login.css';
import Header from './Header';

class Verify extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            forAccount: {
                email: '',
                code: ''
            }
        };
        
        this.onCodeChangeforAccount = this.onCodeChangeforAccount.bind(this);
        this.handleSubmitforAccount = this.handleSubmitforAccount.bind(this);
        this.setUser = this.setUser.bind(this);

    }

    setUser(user, newUser) {
        user.setState(newUser);
    }

    onCodeChangeforAccount(code) {
        const forAccount = {
            email: localStorage.email,
            code: code.target.value
        }
        this.setState({
            forAccount
        });
    }

    

    handleSubmitforAccount = async event => {
        const forAccount = this.state.forAccount;
        console.log(forAccount);

        try {
            const response = await axios.post('http://localhost:5000/api/user/verify', forAccount);          

            console.log("uspesan verify");
            console.log(response.data.message)

            // const target = "/profile/" + localStorage.accountType;
            window.location.href = "/configure";
        } catch (e) {
            window.alert(e.response.data.message);
        }
    }

    render() {
        // const { user, setUser } = this.context;
        return (
            <div className="login">
                <Header />
                <div className="container" id="loginAccount">
                    <h2>Verify your account</h2>

                    <form id="formAccount">
                        <div className="form-group">
                            <label htmlFor="code">Enter verification code:</label>
                            <input type="code" className="form-control" id="code" placeholder="Enter a code" name="code" onChange={this.onCodeChangeforAccount} />
                        </div>


                        <button type="button" onClick={this.handleSubmitforAccount} className="btn btn-success">Verify</button>
                    </form>
                </div>
            </div>
        
        );
    }
}

export default Verify;