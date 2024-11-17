import React from 'react';
import { Link } from 'react-router-dom';
import Header from './headerfooter/Header';
import Footer from './headerfooter/Footer';

const AboutUs = () => {
    return (
        <div>
            <Header />
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>About Us</h1>
                <p style={styles.text}>
                    Welcome to <strong>CRAFTMART</strong>, your destination for exquisite handmade sculptures, furniture, and traditional masks. Our online marketplace connects you with talented artisans from across Sri Lanka, showcasing their unique and masterfully crafted goods. Each product reflects the rich cultural heritage and creativity of the craftsmen who bring it to life.
                </p>
                <h2 style={styles.subtitle}>Our Mission</h2>
                <p style={styles.text}>
                    At CRAFTMART, our mission is to bridge the gap between traditional artisans and the modern world, offering high-quality handmade goods to a global audience. We are committed to preserving the time-honored art forms of Sri Lanka while ensuring that our artisans are fairly compensated for their skills. By choosing CRAFTMART you are not only supporting local communities but also investing in products that carry the soul of our heritage.
                </p>
                <h2 style={styles.subtitle}>What We Offer</h2>
                <ul style={styles.list}>
                    <li><strong>Handmade Sculptures:</strong> Beautifully carved wooden, stone, and metal sculptures that represent Sri Lanka’s rich cultural traditions and artistic excellence.</li>
                    <li><strong>Furniture:</strong> Handcrafted furniture pieces that blend traditional craftsmanship with modern design. From intricately carved chairs to stunning wooden tables, each piece is a work of art.</li>
                    <li><strong>Traditional Masks:</strong> Vibrant and authentic Sri Lankan masks used in cultural ceremonies and as unique decorative pieces for homes.</li>
                </ul>
                <h2 style={styles.subtitle}>Why Choose Us?</h2>
                <ul style={styles.list}>
                    <li><strong>Authenticity:</strong> Every item is handcrafted by skilled artisans, ensuring each piece is unique and carries its own story.</li>
                    <li><strong>Ethical Trade:</strong> We are committed to fair trade, guaranteeing our artisans receive fair compensation for their hard work.</li>
                    <li><strong>Quality Assurance:</strong> We prioritize quality, ensuring that each product is durable, well-crafted, and inspected before it reaches your hands.</li>
                    <li><strong>Cultural Heritage:</strong> Our products preserve and celebrate the rich artisanal traditions of Sri Lanka, making them not just objects but pieces of history.</li>
                </ul>
                <h2 style={styles.subtitle}>Our Story</h2>
                <p style={styles.text}>
                    CRAFTMARTwas born out of a desire to preserve Sri Lanka’s traditional crafts while giving artisans a platform to share their work with the world. Founded by RATHNAYAKE SHILPIYO, who was inspired by the artistry found in local villages, the platform has grown from a small family business to a global marketplace. Today, Rathnayake Shilpiyo stands as a symbol of dedication to quality, craftsmanship, and cultural pride.
                </p>
                <h2 style={styles.subtitle}>Our Values</h2>
                <ul style={styles.list}>
                    <li><strong>Craftsmanship:</strong> We celebrate the skill and creativity of our artisans, ensuring every product represents their passion and dedication.</li>
                    <li><strong>Sustainability:</strong> We promote eco-friendly and sustainable practices in production, using locally sourced materials.</li>
                    <li><strong>Community Support:</strong> By purchasing from CRAFTMART, you are supporting the livelihoods of artisans and helping sustain traditional crafts.</li>
                </ul>
                <h2 style={styles.subtitle}>Get Involved</h2>
                <p style={styles.text}>
                    Join us in celebrating Sri Lanka’s artisanal heritage! Explore our marketplace, share our stories, and choose handmade products that make a difference. Follow us on social media and subscribe to our newsletter for the latest updates, exclusive offers, and new arrivals.
                </p>
                <h2 style={styles.subtitle}>Contact Us</h2>
                <p style={styles.text}>
                    Have questions or feedback? We’re here to help!
                    Check out our FAQ section. 
                    We aim to provide a seamless and enjoyable shopping experience.
                </p>
                <Link to="/" style={styles.backButton}>Back to Home</Link>
            </div>
        </div>
        <Footer />
        </div>
    );
};

const styles = {
    page: {
        backgroundColor: '#fff',
        minHeight: '130vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        fontFamily: 'Poppins, sans-serif',
    },
    container: {
        maxWidth: '800px',
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 3.75px 6px rgba(0, 2, 0, 0.46)',
        fontFamily: 'Poppins, sans-serif',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '1.5rem',
        color: '#4A1416',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: '1.5rem',
        margin: '1.5rem 0 1rem',
        color: '#4A1416',
        fontWeight: 'bold',
    },
    text: {
        fontSize: '1.125rem',
        color: '#333',
        lineHeight: '1.8',
        marginBottom: '1.5rem',
        textAlign: 'justify',
    },
    list: {
        fontSize: '1.125rem',
        color: '#333',
        marginBottom: '1.5rem',
        textAlign: 'justify',
        paddingLeft: '1rem',
    },
    backButton: {
        display: 'inline-block',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#0284c7',
        color: '#FFFFFF',
        textDecoration: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        marginTop: '2rem',
        textAlign: 'center',
        transition: 'background-color 0.3s ease',
    },
};

export default AboutUs;
