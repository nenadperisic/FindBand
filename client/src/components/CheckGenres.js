import React, { Component } from 'react';

class ChekGenres extends Component {

    constructor(props){
        super(props);
        this.state={
            isPop: false,
            isRock: false,
            isCountry: false,
            isJazz: false,
            isMetal: false,
            isFolk: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const {name, checked} = event.target;
        this.setState({
            [name]: checked
        })
    }

    render(){
        return(
            <div>
                <p style={{fontWeight: "bold", fontSize:"20px"}}>Genres:</p>
                <label>
                    <input 
                        type="checkbox"
                        name="isPop"
                        checked={this.state.isPop}
                        onChange={this.handleChange}
                    /> Pop 
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isRock"
                        checked={this.state.isRock}
                        onChange={this.handleChange}
                    /> Rock
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isCountry"
                        checked={this.state.isCountry}
                        onChange={this.handleChange}
                    /> Country 
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isJazz"
                        checked={this.state.isJazz}
                        onChange={this.handleChange}
                    /> Jazz 
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isMetal"
                        checked={this.state.isMetal}
                        onChange={this.handleChange}
                    /> Metal
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isFolk"
                        checked={this.state.isFolk}
                        onChange={this.handleChange}
                    /> Folk
                </label>
            </div>
        );
    }
}

export default ChekGenres;