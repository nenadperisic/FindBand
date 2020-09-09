import React, { Component } from 'react';
import axios from 'axios';
import '../css/Register.css';
import Header from './Header';
import Footer from './Footer';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forAccount: {
                email: '',
                message: ''
            }
        };
    
        this.showFormforAccount = this.showFormforAccount.bind(this);
        this.onMessageChangeforAccount = this.onMessageChangeforAccount.bind(this);
        this.onTitleChangeforAccount = this.onTitleChangeforAccount.bind(this);
        this.handleSubmitforAccount = this.handleSubmitforAccount.bind(this);

    }
    
    

    showFormforAccount() {
        const formAccount = document.getElementById("registerAccount");
        formAccount.style.display = "block";
        this.setState({
            forAccount: {
                title: '',
                message: '',
            }
        });
    }

    onTitleChangeforAccount(title) {
        const forAccount = {
            title: title.target.value,
            message: this.state.forAccount.message
        }
        this.setState({
            forAccount
        });
    }

    onMessageChangeforAccount(message) {
        const forAccount = {
            title: this.state.forAccount.title,
            message: message.target.value
        };

        this.setState({
            forAccount
        });
    }


    handleSubmitforAccount = async event => {
        const forAccount = this.state.forAccount;
        console.log(forAccount.title);
        console.log(forAccount.message);
        try {
            await axios.post('/api/user/contact', {contact: localStorage.getItem("contactMail"), title: forAccount.title, message: forAccount.message, email: localStorage.getItem('email')});
        } catch (e) {
            window.alert("Cannot send email!");
        }

        window.location.href = document.referrer;
    }

    render() {

        return (
            <div className="signin">
                <Header />
                <div className="container" id="registerAccount" style={{paddingTop: '70px', paddingBottom: '50px'}}>

                    <div className="row">

                    <div className="col-lg-3">
                    </div>

                    <div className="card col-lg-6">
                        <div className="card-body">

                            <h2>Contact form</h2>

                            <form id="formAccount">
                                

                                <div className="form-group">
                                    <label htmlFor="email">Title:</label>
                                    <input type="title" className="form-control" id="email" placeholder="Enter title" name="title" onChange={this.onTitleChangeforAccount}/>
                                </div>

                                

                                <div className="form-group">
                                    <label htmlFor="message">Message:</label>
                                    <textarea className="form-control" rows="5" id="message" placeholder="Enter message" name="message" onChange={this.onMessageChangeforAccount}></textarea>
                                </div>
                                

                                <div className="text-center">
                                    <button type="button" onClick={this.handleSubmitforAccount} className="btn btn-success"> Submit </button>
                                </div>
                            </form>

                        </div>
                    </div>

                    <div className="col-lg-3">
                    </div>
                    
                    </div>

                </div>
                <Footer />
            </div>
    );
  }
}

export default Register;