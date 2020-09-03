import React, { Component } from 'react';
import axios from 'axios';
import '../css/FindMBV.css';


class CreateAdMusician extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forAd: {
                title: "",
                genre: "not_selected",
                instrument: "not_selected",
                description: ""
            }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onSelectedGenreChange = this.onSelectedGenreChange.bind(this);
        this.onSelectedInstrumentChange = this.onSelectedInstrumentChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
    }

    checkValidity(entity) {
        if (entity.title === "") {
            window.alert("Please insert title!");
            return false;
        }
        else if (entity.genre === "not_selected") {
            window.alert("Please select genre!");
            return false;
        }
        else if (entity.instrument === "not_selected") {
            window.alert("Please select instrument");
            return false;
        }
        else if (entity.description === "") {
            window.alert("Plese insert advertisement description!");
            return false;
        }

        return true;
    }

    onTitleChange(title) {
        const forAd = {
            title: title.target.value,
            genre: this.state.forAd.genre,
            instrument: this.state.forAd.instrument,
            description: this.state.forAd.description
        }
        this.setState({
            forAd
        });
    }

    onSelectedGenreChange(genre) {
        const forAd = {
            title: this.state.forAd.title,
            genre: genre.target.value,
            instrument: this.state.forAd.instrument,
            description: this.state.forAd.description
        }
        this.setState({
            forAd
        });
    }

    onSelectedInstrumentChange(instrument) {
        const forAd = {
            title: this.state.forAd.title,
            genre: this.state.forAd.genre,
            instrument: instrument.target.value,
            description: this.state.forAd.description
        }
        this.setState({
            forAd
        });
    }

    onDescriptionChange(description) {
        const forAd = {
            title: this.state.forAd.title,
            genre: this.state.forAd.genre,
            instrument: this.state.forAd.instrument,
            description: description.target.value
        }
        this.setState({
            forAd
        });
    }

    handleOnSubmit = async event => {
        let adInfo = this.state.forAd;

        let isValid = this.checkValidity(adInfo);
        if (!isValid) {
            return ;
        }

        let confirm = window.confirm("Are you sure you want to create this advertisement?");
        if (!confirm) {
            return ;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/user/get/user/data',
                { email: localStorage.email }
            );

            const {user} = response.data;

            adInfo["location"] = user.location;
        } catch (e) {
            console.log(e.response.data.message);
        }

        // add needed info
        adInfo["user"] = localStorage.email;
        adInfo["accountType"] = localStorage.accountType;

        // try {
        //     await axios.post('http://localhost:5000/api/forum/createAdBand', adInfo);
        // } catch (e) {
        //     console.log(e.response.data.message);
        // }

        console.log(adInfo);

        window.alert("Ad successfully created!");
        document.getElementById("form-create-ad-musician").reset();
        window.location.href = "profile/" + localStorage.accountType;
    };
    
    render() {
        return (
            <div>
                <div className="container" id="create-ad-musician">
                    <h2> Advertise yourself to bands </h2>

                    <form id="form-create-ad-musician">
                        <div className="form-group">
                                <label htmlFor="title-musician-create-ad"> Advertisement Title: </label>
                                <input id="title-musician-create-ad"
                                    name="title-musician-create-ad"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    onChange={this.onTitleChange}
                                    />
                        </div>

                        <div className="form-group">
                            <label htmlFor="genre-musician-create-ad"> I would like to play (genre): </label>
                            <select id="genre-musician-create-ad" className="form-control" onChange={this.onSelectedGenreChange}>
                                <option value="not_selected"> Select Desired Genre </option>
                                <option value="pop"> Pop </option>
                                <option value="rock"> Rock </option>
                                <option value="jazz"> Jazz </option>
                                <option value="metal"> Metal </option>
                                <option value="folk"> Folk </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="instrument-musician-create-ad"> I would like to play (instrument): </label>
                            <select id="instrument-musician-create-ad" className="form-control" onChange={this.onSelectedInstrumentChange}>
                                <option value="not_selected"> Select Desired Instrument </option>
                                <option value="voice"> Voice </option>
                                <option value="guitar"> Guitar </option>
                                <option value="bassGuitar"> Bass Guitar </option>
                                <option value="piano"> Piano </option>
                                <option value="violin"> Violin </option>
                                <option value="drums"> Drums </option>
                                <option value="trumpet"> Trumpet </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description-musician-create-ad"> Advertisement description: </label>
                            <textarea className="form-control"
                                id="description-musician-create-ad"
                                rows="5"
                                onChange={this.onDescriptionChange}></textarea>
                        </div>

                        <button type="button" onClick={this.handleOnSubmit} className="btn btn-success"> Create Ad </button>
                    </form>
                </div>
            </div>
        );
    }

}

export default CreateAdMusician;