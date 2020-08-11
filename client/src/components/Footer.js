import React from 'react';
import '../css/Footer.css';
import ReturnToTop from 'react-scroll-to-top';

function Footer() {
    return (
        <div className="footer">
            <div className="center">
                <p id="cr">Copyright © 2020, All Rights Reserved</p>
                <br />
                <ReturnToTop />
            </div>
        </div>
    );
}
export default Footer;

