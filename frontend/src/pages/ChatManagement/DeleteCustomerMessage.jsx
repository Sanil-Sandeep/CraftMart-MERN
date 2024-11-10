import React, { useState } from 'react';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import backgroundImage from '../../components/images/BlurBackGround.png'; // Adjust this path as needed
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const DeleteCustomerMessage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteCustomerMessage = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/cchats/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Message Deleted Successfully', { variant: 'success' });
        navigate('/cchats');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div>
    <Header />
    <div style={styles.container}>
      <div style={styles.background} />
      {loading ? <Spinner /> : null}
      <div style={styles.form}>
        <h3 style={styles.heading}>Do You Want To Delete Your Message?</h3>
        <button style={styles.buttonDelete} onClick={handleDeleteCustomerMessage}>
          Yes, Delete it
        </button>
        <button
          style={styles.buttonCancel}
          onClick={() => {
            window.location.href = '/cchats'; // Redirect to the link
          }}
        >
          No
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    padding: '16px',
    minHeight: '100vh',
    fontFamily: 'Poppins, sans-serif',
    overflow: 'hidden', // Ensure no overflow for the blurred background
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(12px)', // Keep the blur effect for the background
    zIndex: -2, // Set behind other elements
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px',
    width: '600px',
    padding: '32px',
    margin: 'auto',
    marginTop: '20rem', // Adjusted margin to center vertically
    backgroundColor: 'rgba(255, 255, 255, 1)', // Opaque background for the form
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.9)', // Increased shadow for high dark effect
    zIndex: 1, // Set above the blurred background
    opacity: 0, // Initial opacity for animation
    transform: 'translateY(20px)', // Initial position for animation
    animation: 'fadeInUp 0.7s forwards', // Animation to apply
  },
  heading: {
    fontSize: '24px',
    margin: '16px 0',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    color: '#330D0F', // Header font color
  },
  buttonDelete: {
    padding: '16px',
    backgroundColor: '#330D0F',
    color: '#ffffff',
    margin: '16px',
    width: '100%',
    border: 'none',
    borderRadius: '48px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    transition: 'transform 0.3s', // Transition for hover effect
  },
  buttonCancel: {
    padding: '16px',
    backgroundColor: '#F1EEDA',
    color: '#330D0F',
    margin: '16px',
    width: '100%',
    border: '2px solid #330D0F',
    borderRadius: '48px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    transition: 'transform 0.3s', // Transition for hover effect
  },
};

// Keyframe animations
const keyframes = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  button:hover {
    transform: scale(1.05); // Scale up on hover
  }
`;

// Injecting keyframes into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);

export default DeleteCustomerMessage;
