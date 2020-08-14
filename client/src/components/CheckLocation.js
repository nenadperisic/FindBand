import React, { Component } from 'react';

class ChekLocation extends Component {

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
        const styleSelect={
            fontWeight: "bold", 
            fontSize:"20px"
        };
        const styleOption={
            background: "rgba(227, 224, 238, 0.7)",
            textShadow: "0 1px 0 rgba(0, 0, 0, 0.4)"
        }
        
        return(
            <div style={{color: "white"}}>
                <p style={styleSelect}>Location:</p>
                
                    <select id="selectAccountType" className="form-control" onChange={this.onAccountTypeChange} selected="musician">
                        <option style={styleOption} value="not_selected">Select a location</option>
                        <option style={styleOption} value="Beograd">Beograd</option>
                        <option style={styleOption} value="Novi Sad">Novi Sad</option>
                        <option style={styleOption} value="Nis">Niš</option>
                        <option style={styleOption} value="Kragujevac">Kragujevac</option>
                        <option style={styleOption} value="Pristina">Priština</option>
                        <option style={styleOption} value="Subotica">Subotica</option>
                        <option style={styleOption} value="Pancevo">Pančevo</option>
                        <option style={styleOption} value="Loznica">Loznica</option>
                        <option style={styleOption} value="Zrenjanin">Zrenjanin</option>
                        <option style={styleOption} value="Cacak">Čačak</option>
                        <option style={styleOption} value="Krusevac">Kruševac</option>
                        <option style={styleOption} value="Kraljevo">Kraljevo</option>
                        <option style={styleOption} value="Novi Pazar">Novi Pazar</option>
                        <option style={styleOption} value="Smederevo">Smederevo</option>
                        <option style={styleOption} value="Leskovac">Leskovac</option>
                        <option style={styleOption} value="Uzice">Užice</option>
                        <option style={styleOption} value="Vranje">Vranje</option>
                        <option style={styleOption} value="Valjevo">Valjevo</option>
                        <option style={styleOption} value="Sabac">Šabac</option>
                        <option style={styleOption} value="Sombor">Sombor</option>
                        <option style={styleOption} value="Pozarevac">Požarevac</option>
                        <option style={styleOption} value="Pirot">Pirot</option>
                        <option style={styleOption} value="Zajecar">Zaječar</option>
                        <option style={styleOption} value="Kikinda">Kikinda</option>
                        <option style={styleOption} value="Sremska Mitrovica">Sremska Mitrovica</option>
                        <option style={styleOption} value="Jagodina">Jagodina</option>
                        <option style={styleOption} value="Vrsac">Vršac</option>
                        <option style={styleOption} value="Bor">Bor</option>
                        <option style={styleOption} value="Prokuplje">Prokuplje</option>
                    </select>
            </div>
        );
    }
}

export default ChekLocation;