import React, { Component } from 'react';

class ChekInstruments extends Component {

    constructor(props){
        super(props);
        this.state={
            isGuitar: false,
            isBassGuitar: false,
            isPiano: false,
            isViolin: false,
            isAccordion: false,
            isVoice: false,
            isDrums: false,
            isTrumpet: false,
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
                <p style={{fontWeight: "bold", fontSize:"20px"}}>Instruments:</p>
                <label>
                    <input 
                        type="checkbox"
                        name="isGuitar"
                        checked={this.state.isGuitar}
                        onChange={this.handleChange}
                    /> Guitar 
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isBassGuitar"
                        checked={this.state.isBassGuitar}
                        onChange={this.handleChange}
                    />  Bass Guitar 
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isPiano"
                        checked={this.state.isPiano}
                        onChange={this.handleChange}
                    /> Piano 
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isViolin"
                        checked={this.state.isViolin}
                        onChange={this.handleChange}
                    /> Violin 
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isAccordion"
                        checked={this.state.isAccordion}
                        onChange={this.handleChange}
                    /> Accordion 
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isVoice"
                        checked={this.state.isVoice}
                        onChange={this.handleChange}
                    /> Voice 
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isDrums"
                        checked={this.state.isDrums}
                        onChange={this.handleChange}
                    /> Drums 
                </label>
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isTrumpet"
                        checked={this.state.isTrumpet}
                        onChange={this.handleChange}
                    /> Trumpet 
                    
                </label>
            </div>
        );
    }
}

export default ChekInstruments;