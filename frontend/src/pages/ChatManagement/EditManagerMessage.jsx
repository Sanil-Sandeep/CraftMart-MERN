import React, { useState, useEffect } from 'react';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import backgroundImage from '../../components/images/BlurBackGround.png'; // Update with your actual background image path
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const EditManagerMessage = () => {
  const [mMessage, setmMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/mchats/${id}`)
      .then((response) => {
        setmMessage(response.data.mMessage);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check console.', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditManagerMessage = () => {
    const data = {
      mMessage,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/mchats/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Message Edited Successfully', { variant: 'success' });
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
      {loading && <Spinner />}
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
          <button style={styles.button} onClick={handleEditManagerMessage}>
            Save
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};



export default EditManagerMessage;
