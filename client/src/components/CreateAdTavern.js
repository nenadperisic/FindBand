import React, { Component } from 'react';
import axios from 'axios';
import '../css/FindMBV.css';


class CreateAdTavern extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                description: '',
                user: '',
                accountType: '',
                types: [],
                location: ''
            }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }
        

    onTitleChange(title) {
        const data = {
            title: title.target.value,
            description: this.state.data.description,
            user: localStorage.email,
            accountType: localStorage.accountType,
            types: this.state.data.types,
            location: this.state.data.location
        };
        this.setState({
            data
        });
    }

    onDescriptionChange(description) {
        const data = {
            title: this.state.data.title,
            description: description.target.value,
            user: localStorage.email,
            accountType: localStorage.accountType,
            types: this.state.data.types,
            location: this.state.data.location
        };
        this.setState({
            data
        });
    }
    applyFilter(event){
        var location = document.getElementById("selectAccountType");
        var strLocation = location.options[location.selectedIndex].text;
        console.log("lokacija je: ")
        console.log(strLocation)

        var checkedTypes = [];
        var types = document.getElementsByClassName('types');
        
        for(var i=0; types[i]; ++i){
            // console.log(inputElements)
            if(types[i].checked){
                checkedTypes.push(types[i].value);
                
             }
        }
        
        console.log(checkedTypes)
        
        const data = {
            title: this.state.data.title,
            description: this.state.data.description,
            user: localStorage.email,
            accountType: localStorage.accountType,
            types: checkedTypes,
            location: strLocation
        };
        this.setState({
            data
        });
        console.log(this.state.data)
    }

    handleOnSubmit = async event => {
        event.preventDefault();
        const data = this.state.data;
        console.log(data)
        try {
            await axios.post('http://localhost:5000/api/forum/createAdTavern', data);
        } catch (e) {
            console.log("Nije uspelo!");
        }
        
    };
    
    
    render() {
        return (
            <div>
                <div className="container" id="containerList">
                    <form id="formAccount">
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input type="title" className="form-control" id="title" placeholder="Enter title" name="title" onChange={this.onTitleChange} />
                            <textarea type="description" id="description"  placeholder="Type description..." name="description" onChange={this.onDescriptionChange}></textarea>
                        </div>
                        <button type="button" onClick={this.handleOnSubmit} className="btn btn-success">Create</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateAdTavern;