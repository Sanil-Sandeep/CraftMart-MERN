import React from 'react';
import rightImage from './images/right.png'; // Ensure the path is correct
import logo from './images/logo.png'; // Import your logo image
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  


  return (
    <div style={styles.body}>
      {/* Header */}
      <header style={styles.header}>
        {/* Logo and Title */}
        <div style={styles.logoContainer}>
          <img src={logo} alt="CraftMart Logo" style={styles.logo} />
          <span style={styles.logoText}>CraftMart</span>
        </div>

        {/* Navigation */}
        <nav style={styles.nav}>
        <Link to="#" style={styles.navItem}>Home</Link>
          <Link to="#" style={styles.navItem}>Products</Link>
          <Link to="#" style={styles.navItem}>About Us</Link>
          <Link to="#" style={styles.navItem}>Gifts</Link>
          <Link to="#" style={styles.navItem}>Support</Link>
        </nav>

        {/* Login Button */}
        <button style={styles.loginButton}>Login</button>
      </header>

      {/* Hero Section */}
      <section style={styles.hero} id="home">
        <h1 style={styles.heroTitle}>
          Experience <br />
          the art of <br />
          unique creations
        </h1>
        <p style={styles.heroText}>
        Discover a curated selection of unique, handmade goods. Each product showcases <br />
        exceptional craftsmanship and offers you distinctive, high-quality items.
        </p>
        
        <button
              style={styles.ctaButton}
              onClick={() => navigate('/login')}
        >
          Login
        </button>

        {/* Right Image */}
        <img src={rightImage} alt="Right Side Image" style={styles.rightImage} />
      </section>
    </div>
  );
};

export default Home;
