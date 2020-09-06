import React, { Component } from 'react';

class ChekLocation extends Component {

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
                
                <select id="tavernLocation"  className="form-control location" onChange={this.onAccountTypeChange} selected="musician">
                        <option style={styleOption} value="not_selected">Select a location</option>
                        <option style={styleOption} value="beograd">Beograd</option>
                        <option style={styleOption} value="noviSad">Novi Sad</option>
                        <option style={styleOption} value="nis">Niš</option>
                        <option style={styleOption} value="kragujevac">Kragujevac</option>
                        <option style={styleOption} value="pristina">Priština</option>
                        <option style={styleOption} value="subotica">Subotica</option>
                        <option style={styleOption} value="pancevo">Pančevo</option>
                        <option style={styleOption} value="loznica">Loznica</option>
                        <option style={styleOption} value="zrenjanin">Zrenjanin</option>
                        <option style={styleOption} value="cacak">Čačak</option>
                        <option style={styleOption} value="krusevac">Kruševac</option>
                        <option style={styleOption} value="kraljevo">Kraljevo</option>
                        <option style={styleOption} value="noviPazar">Novi Pazar</option>
                        <option style={styleOption} value="smederevo">Smederevo</option>
                        <option style={styleOption} value="leskovac">Leskovac</option>
                        <option style={styleOption} value="uzice">Užice</option>
                        <option style={styleOption} value="vranje">Vranje</option>
                        <option style={styleOption} value="valjevo">Valjevo</option>
                        <option style={styleOption} value="sabac">Šabac</option>
                        <option style={styleOption} value="sombor">Sombor</option>
                        <option style={styleOption} value="pozarevac">Požarevac</option>
                        <option style={styleOption} value="pirot">Pirot</option>
                        <option style={styleOption} value="zajecar">Zaječar</option>
                        <option style={styleOption} value="kikinda">Kikinda</option>
                        <option style={styleOption} value="sremskaMitrovica">Sremska Mitrovica</option>
                        <option style={styleOption} value="jagodina">Jagodina</option>
                        <option style={styleOption} value="vrsac">Vršac</option>
                        <option style={styleOption} value="bor">Bor</option>
                        <option style={styleOption} value="prokuplje">Prokuplje</option>
                    </select>
            </div>
        );
    }
}

export default ChekLocation;