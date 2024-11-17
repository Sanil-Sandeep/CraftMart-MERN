import React from 'react';
import './Header.css'; // Add CSS in separate file
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import cartIcon from '../images/cart.png'

const Header = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCartClick = () => {
        navigate('/cart'); // Navigate to cart page
    };
    return (
        <header>
            <div className="logo">
                <img src={logo} alt="CraftMart Logo" className="logo-img" />
                <h1>CraftMart</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="/products/card">Products</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/gifts/card">Gifts</a></li>
                    <li><a href="/cchats">Chat Us</a></li>
                </ul>
            </nav>
            <div className="search-login">
                <input type="text" placeholder="Search..." />
                <button classname="search-btn">Search</button>
                <img 
                    src={cartIcon} 
                    alt="Cart" 
                    className="cart-icon" 
                    onClick={handleCartClick} // Add onClick handler here
                />             
            </div>
            <button
              className='login'
              onClick={() => navigate('/login')}
            >
               LogOut
            </button>
        </header>
    );
};

export default Header;
