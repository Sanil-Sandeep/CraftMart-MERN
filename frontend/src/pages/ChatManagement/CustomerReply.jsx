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



export default CustomerReply;
