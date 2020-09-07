import React, { Component } from 'react';

class ChekGenres extends Component {

    constructor(props) {
        super(props);
        this.state={
            isPop: false,
            isRock: false,
            isJazz: false,
            isMetal: false,
            isFolk: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, checked} = event.target;
        this.setState({
            [name]: checked
        })
    }

    render() {
        return (
            <div style={{color: "white"}}>
                <p style={{fontWeight: "bold", fontSize:"20px"}}>Genres:</p>
                <label>
                    <input 
                        className="genres"
                        type="checkbox"
                        name="isPop"
                        value="Pop"
                        checked={this.state.isPop}
                        onChange={this.handleChange}
                    /> Pop 
                </label>
                <br/>
                <label>
                    <input 
                        className="genres"
                        type="checkbox"
                        name="isRock"
                        value="Rock"
                        checked={this.state.isRock}
                        onChange={this.handleChange}
                    /> Rock
                </label>
                <br/>
                <label>
                    <input 
                        className="genres"
                        type="checkbox"
                        name="isJazz"
                        value="Jazz"
                        checked={this.state.isJazz}
                        onChange={this.handleChange}
                    /> Jazz 
                </label>
                <br/>
                <label>
                    <input 
                        className="genres"
                        type="checkbox"
                        name="isMetal"
                        value="Metal"
                        checked={this.state.isMetal}
                        onChange={this.handleChange}
                    /> Metal
                </label>
                <br/>
                <label>
                    <input 
                        className="genres"
                        type="checkbox"
                        name="isFolk"
                        value="Folk"
                        checked={this.state.isFolk}
                        onChange={this.handleChange}
                    /> Folk
                </label>
            </div>
        );
    }
}

export default ChekGenres;