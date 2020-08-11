import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header';
export class ShowForum extends Component {
    
    handleOnSubmit = async event => {
        event.preventDefault();
        
        // console.log(localStorage.user)
        
        try {
            const response = await axios.get('http://localhost:5000/api/forum/*');
            console.log(response.data);
        } catch (e) {
            console.log("Nije uspelo!");
        }
    };
    render() {
        return (
            <div>
                <Header />
                <button type="button" onClick={this.handleOnSubmit} className="btn btn-success">Show forums</button>
            
            </div>
        )
    }
}

export default ShowForum
