import React from 'react';
import '../css/Header.css'
class Header extends React.Component {


  render() {
    return (
        <div className="header">
                <div className="logo_header">
                    <a href="/">
                        <img src="/logo.jpg" alt="logo" className="logo_header" />
                    </a>
                </div>

                <div className="NB_css">
                    <ul>
                        <a href="/ShowForum">
                            <li> Home </li>
                        </a>
                        <a href="/">
                            <li> Musicians </li>
                        </a>
                        <a href="/">
                            <li> Bands </li>
                        </a>
                        <a href="/">
                            <li> Taverns </li>
                        </a>
                        <a href="/CreateAd">
                            <li> Create </li>
                        </a>
                        <a href="/">
                            <li id="viewProfile"> View profile </li>
                        </a>
                    </ul>
                </div>
        </div>
      
      );
  }

}

export default Header;