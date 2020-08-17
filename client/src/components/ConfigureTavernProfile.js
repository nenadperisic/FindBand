import React, { Component } from 'react';
import axios from 'axios';
import '../css/ConfigureProfile.css';
import Header from './Header';

class ConfigureTavernProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forTavern: {
                name: '',
                type: '',
                location: '',
                description: ''
                // numberOfSittings: '',
            }
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.handleConfigureTavern = this.handleConfigureTavern.bind(this);
    }

    onNameChange(name) {
        const forTavern = {
            name: name.target.value,
            type: this.state.forTavern.type,
            location: this.state.forTavern.location,
            description: this.state.forTavern.description,
            
        }
        this.setState({
            forTavern
        });
    }

    onTypeChange(type) {
        const forTavern = {
            name: this.state.forTavern.name,
            type: type.target.value,
            location: this.state.forTavern.location,
            description: this.state.forTavern.description,
            
        }
        this.setState({
            forTavern
        });
    }

    onLocationChange(location) {
        const forTavern = {
            name: this.state.forTavern.name,
            type: this.state.forTavern.type,
            location: location.target.value,
            description: this.state.forTavern.description,
            
        }
        this.setState({
            forTavern
        });
    }

    onDescriptionChange(description) {
        const forTavern = {
            name: this.state.forTavern.name,
            type: this.state.forTavern.type,
            location: this.state.forTavern.location,
            description: description.target.value,
            
        }
        this.setState({
            forTavern
        });
    }

    handleConfigureTavern = async event => {
        const forTavern = this.state.forTavern;
        // event.preventDefault();

        try {
            /* await */ axios.post(
                'http://localhost:5000/api/user/configure/tavern',
                {
                    email: localStorage.email,
                    name: forTavern.name,
                    type: forTavern.type,
                    location: forTavern.location,
                    description: forTavern.description,
                });

                localStorage.setItem("name", forTavern);
                localStorage.setItem("genre", forTavern);
        } catch (e) {
            console.log(e.response.data.message);
            // window.alert("Something is wrong!");
        }

        document.getElementById("tavernAccountForm").reset();
    }

    render() {
        return (
            <div className="profile">
                <Header />
                <div className="container" id="tavernAccount">
                    <form id="tavernAccountForm">
                        <h2> Configure your profile </h2>

                        <div className="form-group">
                            <label htmlFor="name"> Name of the place: </label>
                            <input type="textarea" className="form-control" id="name" placeholder="Enter name" name="name" onChange={this.onNameChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type"> Type: </label>
                            <select id="type" className="form-control" onChange={this.onTypeChange} >
                                <option value="not_selected"> Select type </option>
                                <option value="pub"> Pub </option>
                                <option value="restaurant"> Restaurant </option>
                                <option value="nightclub"> Nightclub </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="location"> Location: </label>
                            <select id="location" className="form-control" onChange={this.onLocationChange} >
                                <option value="not_selected">Select Location</option>
                                <option value="belgrade"> Belgrade </option>
                                <option value="noviSad"> Novi Sad </option>
                                <option value="nis"> Niš </option>
                                <option value="kragujevac"> Kragujevac </option>
                                <option value="subotica"> Subotica </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description"> Profile description: </label>
                            <textarea class="form-control"
                                id="description"
                                rows="5"
                                onChange={this.onDescriptionChange}></textarea>
                        </div>

                        <button type="button" onClick={this.handleConfigureTavern} className="btn btn-success"> Save changes </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ConfigureTavernProfile;