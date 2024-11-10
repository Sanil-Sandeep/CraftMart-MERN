import React, { useState } from 'react';
//import BackButton from '../components/BackButton';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import backgroundImage from '../../components/images/BlurBackGround.png'; // Adjust this path as needed
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';


const CreateManagerMessage = () => {
  const [mMessage, setmMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveMessage = () => {
    const data = {
      mMessage,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/mchats', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Message sent successfully', { variant: 'success' });
        navigate('/mchats');
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
        <div style={styles.messageContainer}>
          <label style={styles.label} htmlFor="message"></label>
          <textarea
            id="message"
            value={mMessage}
            onChange={(e) => setmMessage(e.target.value)}
            style={styles.textarea}
            rows="1"
          />
          <button style={styles.button} onClick={handleSaveMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};



export default CreateManagerMessage;
