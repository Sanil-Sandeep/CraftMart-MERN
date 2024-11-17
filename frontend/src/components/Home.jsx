import React from 'react';
import rightImage from './images/right.png'; // Ensure the path is correct
import logo from './images/logo.png'; // Import your logo image
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const styles = {
    body: {
      margin: '0',
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#330D0F',
      color: '#F1EEDA',
      position: 'relative',
      overflow: 'hidden',
    },
    header: {
      width: '100%',
      padding: '20px 10px',
      backgroundColor: '#330D0F',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#F1EEDA',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '150px', // Increase this to move the whole container to the right
    },
    logo: {
      width: '80px', // Adjust size of logo if needed
      height: 'auto',
    },
    logoText: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#F1EEDA',
      marginTop: '25px', // Add margin-top to move it down slightly
    },
    nav: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
    navItem: {
      margin: '0 20px', 
      fontSize: '1.2rem',
      cursor: 'pointer',
      color: '#F1EEDA',
    },
    loginButton: {
      padding: '10px 20px',
      fontSize: '1rem',
      backgroundColor: '#F1EEDA',
      color: '#330D0F',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      marginRight: '280px',
      fontWeight: 'bold',
    },
    hero: {
      height: '86.9vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: '#330D0F',
      color: '#F1EEDA',
      textAlign: 'left',
      position: 'relative',
      padding: '0 30px',
    },
    heroTitle: {
      fontSize: '5.2rem',
      marginBottom: '20px',
      fontWeight: 'bold',
      marginLeft: '150px',
      lineHeight: '1.1',
      color: '#F1EEDA',
    },
    heroText: {
      fontSize: '1.3rem',
      marginBottom: '40px',
      marginLeft: '150px',
    },
    ctaButton: {
      padding: '10px 20px',
      fontSize: '1rem',
      backgroundColor: '#F1EEDA',
      color: '#330D0F',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      alignSelf: 'flex-start',
      marginLeft: '150px',
      fontWeight: 'bold',
    },
    rightImage: {
      position: 'absolute',
      right: '0',
      top: '52%',
      transform: 'translateY(-50%)',
      width: '428px',
      height: 'auto',
    },
  };

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
