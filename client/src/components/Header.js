import React from 'react';
import '../css/Header.css'

class Header extends React.Component {

  render() {
    return (
      <div className="header">
            <div className="logo_header">
                <a href="/">
                    <img src="/logoVeb.jpeg" alt="logo" className="logo_header" />
                </a>
            </div>

            <div className="NB_css">
                <ul>
                    <a href="/">
                        <li> Home </li>
                    </a>

                    <a href="/Musicians">
                        <li> Musicians </li>
                    </a>

                    <a href="/Bands">
                        <li> Bands </li>
                    </a>

                    <a href="/">
                        <li> Tavern </li>
                    </a>

                    <a href={localStorage.accountType === undefined ? "/" : "/CreateAd"}>
                        <li> Create ad </li>
                    </a>
                    
                    <a href="/profile/musician">
                        <li id="viewProfile"> View profile </li>
                    </a>
                </ul>
            </div>
      </div>
      );
  }

}

export default Header;