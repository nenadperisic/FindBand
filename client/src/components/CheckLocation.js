import React, { Component } from 'react';

class ChekLocation extends Component {

    render() {
        const styleSelect={
            fontWeight: "bold", 
            fontSize:"20px"
        };
        const styleOption={
            background: "rgba(227, 224, 238, 0.7)",
            textShadow: "0 1px 0 rgba(0, 0, 0, 0.4)"
        }
        
        return (
            <div style={{color: "white"}}>
                <p style={styleSelect}>Location:</p>
                
                <select id="tavernLocation"  className="form-control location" onChange={this.onAccountTypeChange} selected="musician">
                    <option value="not_selected"> Select Location </option>
                        <option  style={styleOption} value="Belgrade" > Belgrade </option>
                        <option  style={styleOption} value="Bor" > Bor </option>
                        <option  style={styleOption} value="Čačak" > Čačak </option>
                        <option  style={styleOption} value="Jagodina" > Jagodina </option>
                        <option  style={styleOption} value="Kikinda" > Kikinda </option>
                        <option  style={styleOption} value="Kragujevac" > Kragujevac </option>
                        <option  style={styleOption} value="Kraljevo" > Kraljevo </option>
                        <option  style={styleOption} value="Kruševac" > Kruševac </option>
                        <option  style={styleOption} value="Leskovac" > Leskovac </option>
                        <option  style={styleOption} value="Loznica" > Loznica </option>
                        <option  style={styleOption} value="Niš" > Niš </option>
                        <option  style={styleOption} value="Novi Pazar" > Novi Pazar </option>
                        <option  style={styleOption} value="Novi Sad" > Novi Sad </option>
                        <option  style={styleOption} value="Pančevo" > Pančevo </option>
                        <option  style={styleOption} value="Pirot" > Pirot </option>
                        <option  style={styleOption} value="Požarevac" > Požarevac </option>
                        <option  style={styleOption} value="Priština" > Priština </option>
                        <option  style={styleOption} value="Prokuplje" > Prokuplje </option>
                        <option  style={styleOption} value="Šabac" > Šabac </option>
                        <option  style={styleOption} value="Smederevo" > Smederevo </option>
                        <option  style={styleOption} value="Sombor" > Sombor </option>
                        <option  style={styleOption} value="Sremska Mitrovica" > Sremska Mitrovica </option>
                        <option  style={styleOption} value="Subotica" > Subotica </option>
                        <option  style={styleOption} value="Užice" > Užice </option>
                        <option  style={styleOption} value="Valjevo" > Valjevo </option>
                        <option  style={styleOption} value="Vranje" > Vranje </option>
                        <option  style={styleOption} value="Vršac" > Vršac </option>
                        <option  style={styleOption} value="Zaječar" > Zaječar </option>
                        <option  style={styleOption} value="Zrenjanin" > Zrenjanin </option>
                    </select>
            </div>
        );
    }
}

export default ChekLocation;