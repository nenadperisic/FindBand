import React from 'react';
import '../css/Footer.css';
import ReturnToTop from 'react-scroll-to-top';

function Footer() {
    return (
        <div className="footer">
            <div className="copyright">
                <p>Copyright © 2020, All Rights Reserved</p>
                <ReturnToTop />
            </div>
        </div>
    );
}
export default Footer;

