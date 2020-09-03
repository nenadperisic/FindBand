import React, { Component } from 'react';
import axios from 'axios';
import '../css/FindMBV.css';

class CreateAdBand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forAd: {
                title: "",
                genre: "not_selected",
                instrument: "not_selected",
                location: "not_selected",
                description: ""
            }
        };
    
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onSelectedGenreChange = this.onSelectedGenreChange.bind(this);
        this.onSelectedInstrumentChange = this.onSelectedInstrumentChange.bind(this);
        this.onSelectedLocationChange = this.onSelectedLocationChange.bind(this);
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
        else if (entity.location === "not_selected") {
            window.alert("Please select location");
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
            location: this.state.forAd.location,
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
            location: this.state.forAd.location,
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
            location: this.state.forAd.location,
            description: this.state.forAd.description
        }
        this.setState({
            forAd
        });
    }

    onSelectedLocationChange(location) {
        const forAd = {
            title: this.state.forAd.title,
            genre: this.state.forAd.genre,
            instrument: this.state.forAd.instrument,
            location: location.target.value,
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
            location: this.state.forAd.location,
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

        // add needed info
        adInfo["user"] = localStorage.email;
        adInfo["accountType"] = localStorage.accountType;

        try {
            await axios.post('http://localhost:5000/api/forum/createAdBand', adInfo);
        } catch (e) {
            console.log(e.response.data.message);
        }

        console.log(adInfo);

        window.alert("Ad successfully created!");
        document.getElementById("form-create-ad-band").reset();
        window.location.href = "profile/" + localStorage.accountType;
    };
    
    
    render() {
        return (
            <div>
                <div className="container" id="create-ad-band">
                    <h2> Create advertisement for your band </h2>

                    <form id="form-create-ad-band">
                        <div className="form-group">
                                <label htmlFor="title-band-create-ad"> Advertisement Title: </label>
                                <input id="title-band-create-ad"
                                    name="title-band-create-ad"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    onChange={this.onTitleChange}
                                    />
                        </div>

                        <div className="form-group">
                            <label htmlFor="genre-band-create-ad"> Select wanted genre: </label>
                            <select id="genre-band-create-ad" className="form-control" onChange={this.onSelectedGenreChange}>
                                <option value="not_selected"> Select Wanted Genre </option>
                                <option value="pop"> Pop </option>
                                <option value="rock"> Rock </option>
                                <option value="jazz"> Jazz </option>
                                <option value="metal"> Metal </option>
                                <option value="folk"> Folk </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="instrument-band-create-ad"> Select wanted instrument: </label>
                            <select id="instrument-band-create-ad" className="form-control" onChange={this.onSelectedInstrumentChange}>
                                <option value="not_selected"> Select Wanted Instrument </option>
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
                            <label htmlFor="location-band-create-ad"> Location: </label>
                            <select id="location-band-create-ad" className="form-control" onChange={this.onSelectedLocationChange} >
                                <option value="not_selected">Select Location</option>
                                <option value="belgrade"> Belgrade </option>
                                <option value="noviSad"> Novi Sad </option>
                                <option value="nis"> Niš </option>
                                <option value="kragujevac"> Kragujevac </option>
                                <option value="subotica"> Subotica </option>
                                <option value="pristina"> Priština </option>
                                <option value="pancevo"> Pančevo </option>
                                <option value="loznica"> Loznica </option>
                                <option value="zrenjanin"> Zrenjanin </option>
                                <option value="cacak"> Čačak </option>
                                <option value="krusevac"> Kruševac </option>
                                <option value="kraljevo"> Kraljevo </option>
                                <option value="noviPazar"> Novi Pazar </option>
                                <option value="smederevo"> Smederevo </option>
                                <option value="leskovac"> Leskovac </option>
                                <option value="uzice"> Užice </option>
                                <option value="vranje"> Vranje </option>
                                <option value="valjevo"> Valjevo </option>
                                <option value="sabac"> Šabac </option>
                                <option value="sombor"> Sombor </option>
                                <option value="pozarevac"> Požarevac </option>
                                <option value="pirot"> Pirot </option>
                                <option value="zajecar"> Zaječar </option>
                                <option value="kikinda"> Kikinda </option>
                                <option value="sremskaMitrovica"> Sremska Mitrovica </option>
                                <option value="jagodina"> Jagodina </option>
                                <option value="vrsac"> Vršac </option>
                                <option value="bor"> Bor </option>
                                <option value="prokuplje"> Prokuplje </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description-band-create-ad"> Advertisement description: </label>
                            <textarea className="form-control"
                                id="description-band-create-ad"
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

export default CreateAdBand;