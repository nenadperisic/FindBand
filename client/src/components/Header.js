import React from 'react';
import '../css/Header.css'

class Header extends React.Component {

  render() {
    return (
      <div className="header">
            <div className="logo_header">
                <a href="/">
                    {/* <img src="/logo.png" alt="logo" className="logo" /> */}
                    logo
                </a>
            </div>

            <div className="NB_css">
                <ul>
                    <li>
                        <a href="/"> Home </a>
                    </li>
                </ul>
            </div>
      </div>
      );
  }

}

export default Header;