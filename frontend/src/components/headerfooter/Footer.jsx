import React from 'react';
import './Footer.css'; // Add CSS in separate file
import Whatsapp from '../images/wa.png';
import Insta from '../images/ins.png';
import FB from '../images/fb.png';

const Footer = () => {
    return (
        <footer>
            <div className="contact-info">
                <h3>Contact Us</h3>
                <div className="social-media">
                    <a href="#"><img src={Insta} alt="Instagram" /></a>
                    <a href="#"><img src={FB} alt="Facebook" /></a>
                    <a href="#"><img src={Whatsapp} alt="WhatsApp" /></a>
                </div>
                <p>Tel: 0772302300 / 0772402400</p>
            </div>
            <div className="powered-by">
                <p>CraftMart is powered by 100% renewable electricity.</p>
            </div>
            <div className="footer-links">

            <ul>
    <li><a href="/deliverys/create">Shipping & Delivery</a></li>
    <li><a href="/events/card">Events</a></li>
    <li><a href="/feedbacks/full">Feedback</a></li>
    <li><a href="/records">Return & Refunds</a></li>
</ul>

            </div>
            <div>
                <h1>CraftMart</h1>
                <br/>
            <div className="legal-links">
                
                <ul>
                    <li><a href="#">Terms of Use</a></li>
                    <li><a href="#">Privacy Policies</a></li>
                </ul>
                
                
            </div>
            </div>
        </footer>
    );
};

export default Footer;
