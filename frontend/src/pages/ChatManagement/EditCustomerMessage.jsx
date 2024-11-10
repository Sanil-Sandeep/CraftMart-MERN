import React, { useState, useEffect } from 'react';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import backgroundImage from '../../components/images/BlurBackGround.png'; // Update with your actual background image path
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const EditCustomerMessage = () => {
  const [cMessage, setcMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/cchats/${id}`)
      .then((response) => {
        setcMessage(response.data.cMessage);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check console.', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditCustomerMessage = () => {
    const data = {
      cMessage,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/cchats/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Message Edited Successfully', { variant: 'success' });
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
      {loading && <Spinner />}
      <div style={styles.form}>
        <div style={styles.messageContainer}>
          <label style={styles.label} htmlFor="message"></label>
          <textarea
            id="message"
            value={cMessage}
            onChange={(e) => setcMessage(e.target.value)}
            style={styles.textarea}
            rows="1"
          />
          <button style={styles.button} onClick={handleEditCustomerMessage}>
            Save
          </button>
        </div>
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
    overflow: 'hidden',
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
    filter: 'blur(12px)',
    zIndex: -2,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0.75rem',
    width: '750px',
    padding: '0.75rem',
    margin: 'auto',
    marginTop: '35rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 4px 8px rgba(0.9, 0.9, 2, 0.9)',
    zIndex: 1,
    opacity: 0,
    transform: 'translateY(20px)',
    animation: 'fadeInUp 0.7s forwards',
  },
  label: {
    fontSize: '0.9375rem',
    marginBottom: '0.5rem',
    color: '#330D0F',
    display: 'block',
    fontWeight: 'bold',
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textarea: {
    border: '2.5px solid #E1E1E1',
    borderRadius: '0.75rem',
    padding: '0.375rem 0.75rem',
    width: '70%',
    fontSize: '1rem',
    fontWeight: 'bold',
    resize: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    transition: 'border-color 0.3s, transform 0.3s',
  },
  button: {
    padding: '0.375rem 1rem',
    backgroundColor: '#330D0F',
    color: '#F1EEDA',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '1.5rem',
    fontWeight: 'bold',
    fontSize: '0.9375rem',
    transition: 'transform 0.3s, background-color 0.3s',
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

  textarea:focus {
    border-color: #330D0F;
    transform: scale(1.02);
  }

  button:hover {
    transform: scale(1.05);
    background-color: #4A1F22;
  }
`;

// Injecting keyframes into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);

export default EditCustomerMessage;
