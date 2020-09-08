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
            console.log(e);
        }

        console.log(adInfo);

        window.alert("Ad successfully created!");
        document.getElementById("form-create-ad-band").reset();
        window.location.href = "profile/" + localStorage.accountType;
    };
    
    
    render() {
        return (
            <div>
                <div className="container" id="create-ad-band" style={{ paddingTop: '70px', paddingBottom: '50px' }}>

                    <div className="row">

                        <div className="col-lg-3">
                        </div>

                        <div className="card col-lg-6">
                            <div className="card-body">

                                <h2> Advertise open positions in your band to musicians </h2>

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
                                            <option value="Pop"> Pop </option>
                                            <option value="Rock"> Rock </option>
                                            <option value="Jazz"> Jazz </option>
                                            <option value="Metal"> Metal </option>
                                            <option value="Folk"> Folk </option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="instrument-band-create-ad"> Select wanted instrument: </label>
                                        <select id="instrument-band-create-ad" className="form-control" onChange={this.onSelectedInstrumentChange}>
                                            <option value="not_selected"> Select Wanted Instrument </option>
                                            <option value="Voice"> Voice </option>
                                            <option value="Guitar"> Guitar </option>
                                            <option value="Bass Guitar"> Bass Guitar </option>
                                            <option value="Piano"> Piano </option>
                                            <option value="Violin"> Violin </option>
                                            <option value="Drums"> Drums </option>
                                            <option value="Trumpet"> Trumpet </option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="location-band-create-ad"> Location: </label>
                                        <select id="location-band-create-ad" className="form-control" onChange={this.onSelectedLocationChange} >
                                            <option value="not_selected"> Select Location </option>
                                            <option value="Belgrade" > Belgrade </option>
                                            <option value="Bor" > Bor </option>
                                            <option value="Čačak" > Čačak </option>
                                            <option value="Jagodina" > Jagodina </option>
                                            <option value="Kikinda" > Kikinda </option>
                                            <option value="Kragujevac" > Kragujevac </option>
                                            <option value="Kraljevo" > Kraljevo </option>
                                            <option value="Kruševac" > Kruševac </option>
                                            <option value="Leskovac" > Leskovac </option>
                                            <option value="Loznica" > Loznica </option>
                                            <option value="Niš" > Niš </option>
                                            <option value="Novi Pazar" > Novi Pazar </option>
                                            <option value="Novi Sad" > Novi Sad </option>
                                            <option value="Pančevo" > Pančevo </option>
                                            <option value="Pirot" > Pirot </option>
                                            <option value="Požarevac" > Požarevac </option>
                                            <option value="Priština" > Priština </option>
                                            <option value="Prokuplje" > Prokuplje </option>
                                            <option value="Šabac" > Šabac </option>
                                            <option value="Smederevo" > Smederevo </option>
                                            <option value="Sombor" > Sombor </option>
                                            <option value="Sremska Mitrovica" > Sremska Mitrovica </option>
                                            <option value="Subotica" > Subotica </option>
                                            <option value="Užice" > Užice </option>
                                            <option value="Valjevo" > Valjevo </option>
                                            <option value="Vranje" > Vranje </option>
                                            <option value="Vršac" > Vršac </option>
                                            <option value="Zaječar" > Zaječar </option>
                                            <option value="Zrenjanin" > Zrenjanin </option>
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
                        
                        <div className="col-lg-3">
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CreateAdBand;