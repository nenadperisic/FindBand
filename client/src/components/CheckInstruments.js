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
        // console.log(this.state)
    }

    render(){
        return(
            <div style={{color: "white"}}>
                <p style={{fontWeight: "bold", fontSize:"20px"}}>Instruments:</p>
                <label>
                    <input 
                        class="instruments"
                        type="checkbox"
                        name="isGuitar"
                        value="Guitar"
                        checked={this.state.isGuitar}
                        onChange={this.handleChange}
                    /> Guitar 
                </label>
                <br/>
                <label>
                    <input 
                        class="instruments"
                        type="checkbox"
                        name="isBassGuitar"
                        value="Bass guitar"
                        checked={this.state.isBassGuitar}
                        onChange={this.handleChange}
                    />  Bass Guitar 
                </label>
                <br/>
                <label>
                    <input 
                        class="instruments"
                        type="checkbox"
                        name="isPiano"
                        value="Piano"
                        checked={this.state.isPiano}
                        onChange={this.handleChange}
                    /> Piano 
                </label>
                <br/>
                <label>
                    <input 
                        class="instruments"
                        type="checkbox"
                        name="isViolin"
                        value="Violin"
                        checked={this.state.isViolin}
                        onChange={this.handleChange}
                    /> Violin 
                </label>
                <br/>
                <label>
                    <input 
                        class="instruments"
                        type="checkbox"
                        name="isAccordion"
                        value="Accordion"
                        checked={this.state.isAccordion}
                        onChange={this.handleChange}
                    /> Accordion 
                </label>
                <br/>
                <label>
                    <input 
                        class="instruments"
                        type="checkbox"
                        name="isVoice"
                        value="Voice"
                        checked={this.state.isVoice}
                        onChange={this.handleChange}
                    /> Voice 
                </label>
                <br/>
                <label>
                    <input 
                        class="instruments"
                        type="checkbox"
                        name="isDrums"
                        value="Drums"
                        checked={this.state.isDrums}
                        onChange={this.handleChange}
                    /> Drums 
                </label>
                <br/>
                <label>
                    <input 
                        class="instruments"
                        type="checkbox"
                        name="isTrumpet"
                        value="Trumpet"
                        checked={this.state.isTrumpet}
                        onChange={this.handleChange}
                    /> Trumpet 
                    
                </label>
            </div>
        );
    }
}

export default ChekInstruments;