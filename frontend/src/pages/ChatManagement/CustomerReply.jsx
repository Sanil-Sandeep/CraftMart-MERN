import React, { useState, useEffect } from 'react';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import backgroundImage from '../../components/images/BlurBackGround.png'; // Adjust this path as needed
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const CustomerReply = () => {
  const [mMessage, setmMessage] = useState('');
  const [mReply, setmReply] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/mchats/${id}`)
      .then((response) => {
        setmMessage(response.data.mMessage);
        setmReply(response.data.mReply);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console');
        console.log(error);
      });
  }, [id]);

  const handleCustomerReply = () => {
    const data = {
      mMessage,
      mReply,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/mchats/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Reply Added Successfully', { variant: 'success' });
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
        <h1 style={styles.heading}></h1>

        <div style={{ marginBottom: '1rem' }}>
          <label style={styles.label} htmlFor="message"></label>
          <textarea
            id="message"
            value={mMessage}
            readOnly
            onChange={(e) => setmMessage(e.target.value)}
            style={styles.textarea}
            rows="1" // Adjust rows as needed for height
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={styles.label} htmlFor="reply"></label>
          <textarea
            id="reply"
            value={mReply}
            onChange={(e) => setmReply(e.target.value)}
            style={styles.textarea}
            rows="1" // Adjust rows as needed for height
          />
        </div>

        <button style={styles.button} onClick={handleCustomerReply}>
          Submit
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
    padding: '0.75rem',
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
    filter: 'blur(12px)', // Increased blur effect
    zIndex: -2, // Set behind other elements
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0.75rem',
    width: '450px',
    padding: '0.75rem',
    margin: 'auto',
    marginTop: '25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for the form
    boxShadow: '0 4.75px 9px rgba(0, 2, 0, 4.65)',
    fontFamily: 'Poppins, sans-serif',
    zIndex: 1, // Set above the blurred background
    opacity: 0, // Initial opacity for animation
    transform: 'translateY(20px)', // Initial position for animation
    animation: 'fadeInUp 0.7s forwards', // Animation to apply
  },
  heading: {
    fontSize: '1.5rem',
    margin: '0.75rem 0',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    color: '#330D0F', // Header font color
  },
  label: {
    fontSize: '0.9375rem',
    marginBottom: '0.5rem',
    color: '#330D0F',
    display: 'block',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
  },
  textarea: {
    border: '2.5px solid #E1E1E1',
    borderRadius: '0.75rem',
    padding: '0.375rem 0.75rem',
    width: '80%',
    margin: '0 auto',
    display: 'block',
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    resize: 'none', // Prevents the textarea from being resizable
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent textarea background
  },
  button: {
    padding: '0.375rem',
    backgroundColor: '#330D0F',
    color: '#F1EEDA',
    margin: '1.5rem 0',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '1.5rem',
    fontWeight: 'bold',
    width: '80%',
    alignSelf: 'center',
    minHeight: '41.25px',
    fontSize: '12.75px',
    fontFamily: 'Poppins, sans-serif',
  },
};

export default CustomerReply;
