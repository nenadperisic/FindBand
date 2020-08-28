import React from 'react';
import '../css/Header.css';
import {Nav, Navbar} from 'react-bootstrap';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.loginPage = this.loginPage.bind(this);
        this.registerPage = this.registerPage.bind(this);
        this.profilePage = this.profilePage.bind(this);
        this.logoutPage = this.logoutPage.bind(this);
    }

    loginPage() {
        window.location.href = "/login";
    }

    registerPage() {
        window.location.href = "/register";
    }

    profilePage() {
        let target = "/profile/" + localStorage.accountType;
        window.location.href = target;
    }

    logoutPage() {
        if (!localStorage.email) {
            window.alert("You are not logged in");
        } else {
            let confirm = window.confirm("Logout from your account?");
            if (confirm) {
                localStorage.clear();

                window.location.href = "/";
            }
        }
    }

    render() {
        return (
            <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/"> 
                <img
                    src="/logoVeb.jpeg"
                    width="40"
                    height="40"
                    className="d-inline-block align-top"
                    alt="NAĐI BEND"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link id="home-nav" className="nav-link-header" href="/"> Home </Nav.Link>
                    <Nav.Link id="musicians-nav" className="nav-link-header" href="/Musicians"> Musicians </Nav.Link>
                    <Nav.Link id="bands-nav" className="nav-link-header" href="/Bands"> Bands </Nav.Link>
                    <Nav.Link id="taverns-nav" className="nav-link-header" href="/Taverns"> Taverns </Nav.Link>
                    <Nav.Link id="createAd-nav" className="nav-link-header" href="/CreateAd"> CreateAd </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link id="login-nav" className="nav-link-header" href="#" onClick={this.loginPage}> Login </Nav.Link>
                    <Nav.Link id="register-nav" className="nav-link-header" href="#" onClick={this.registerPage}> Register </Nav.Link>
                    <Nav.Link id="view-profile-nav" className="nav-link-header" href="#" onClick={this.profilePage}> View Profile </Nav.Link>
                    <Nav.Link id="logout-nav" className="nav-link-header" href="#" onClick={this.logoutPage}> Logout </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    };

    componentDidMount() {
        let loginNav = document.getElementById('login-nav');
        let registerNav = document.getElementById('register-nav');
        let viewProfileNav = document.getElementById('view-profile-nav');
        let logoutNav = document.getElementById('logout-nav');

        if (!localStorage.email) {
            loginNav.style.display = "block";
            registerNav.style.display = "block";
            viewProfileNav.style.display = "none";
            logoutNav.style.display = "none";
        } else {            
            loginNav.style.display = "none";
            registerNav.style.display = "none";
            viewProfileNav.style.display = "block";
            logoutNav.style.display = "block";
        }

        let tagId = "";
        if (window.location.href.includes("login")) {
            tagId = "login-nav";
        }
        else if (window.location.href.includes("register")) {
            tagId = "register-nav";
        }
        else if (window.location.href.includes("profile")) {
            tagId = "view-profile-nav";
        }
        else if (window.location.href.includes("Musicians")) {
            tagId = "musicians-nav";
        }
        else if (window.location.href.includes("Bands")) {
            tagId = "bands-nav";
        }
        else if (window.location.href.includes("Taverns")) {
            tagId = "taverns-nav";
        }
        else if (window.location.href.includes("CreateAd")) {
            tagId = "createAd-nav";
        }
        else if (window.location.href.endsWith("/")) {
            tagId = "home-nav";
        }

        // color in CSS class is not working, so we need to do it separately (not in a class)
        if (tagId !== "") {
            document.getElementById(tagId).style.color = "white";
            document.getElementById(tagId).className += " active-nav-link";
        }
    }

}

export default Header;