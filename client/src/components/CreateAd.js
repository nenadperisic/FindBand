import React, { Component } from 'react';
import Header from './Header'
import axios from 'axios';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                description: '',
                user: ''
            }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
    }
        

    onTitleChange(title) {
        const data = {
            title: title.target.value,
            description: this.state.data.description,
            user: localStorage.email
        };
        this.setState({
            data
        });
    }

    onDescriptionChange(description) {
        const data = {
            title: this.state.data.title,
            description: description.target.value,
            user: localStorage.email
        };
        this.setState({
            data
        });
    }

    handleOnSubmit = async event => {
        event.preventDefault();
        const data = this.state.data;
        // console.log(localStorage.user)
        console.log(data)
        try {
            await axios.post('http://localhost:5000/api/forum/create', data);
        } catch (e) {
            console.log("Nije uspelo!");
        }
        
        
        
    };

    
    
    render() {
        return (
            <div className="createAd">
                <Header />
                <div className="container" id="forumForm">
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

export default Home;