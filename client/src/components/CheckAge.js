import React, { Component } from 'react';

class ChekGenres extends Component {

    constructor(props){
        super(props);
        this.state={
            isTeen: false,
            isYoung: false,
            isAdult: false,
            isMiddleAged: false,
            isMature: false,
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
                <p style={{fontWeight: "bold", fontSize:"20px"}}>Average age:</p>
                <label>
                    <input 
                        type="checkbox"
                        name="isTeen"
                        checked={this.state.isTeen}
                        onChange={this.handleChange}
                    /> 15 - 20 
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isYoung"
                        checked={this.state.isYoung}
                        onChange={this.handleChange}
                    /> 21 - 30
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isAdult"
                        checked={this.state.isAdult}
                        onChange={this.handleChange}
                    /> 31 - 40 
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isMiddleAged"
                        checked={this.state.isMiddleAged}
                        onChange={this.handleChange}
                    /> 41 - 50 
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isMature"
                        checked={this.state.isMature}
                        onChange={this.handleChange}
                    /> 50+
                </label>
            </div>
        );
    }
}

export default ChekGenres;