import React, { useState, useEffect } from 'react';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import backgroundImage from '../../components/images/BlurBackGround.png'; // Adjust this path as needed
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ManagerReply = () => {
  const [cMessage, setcMessage] = useState('');
  const [cReply, setcReply] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/cchats/${id}`)
      .then((response) => {
        setcMessage(response.data.cMessage);
        setcReply(response.data.cReply);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console');
        console.log(error);
      });
  }, [id]);

  const handleManagerReply = () => {
    const data = {
      cMessage,
      cReply,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/cchats/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Reply Sent Successfully', { variant: 'success' });
        navigate('/mchats'); // Redirect to the desired page after submission
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error while sending reply', { variant: 'error' });
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
            value={cMessage}
            readOnly
            onChange={(e) => setcMessage(e.target.value)}
            style={styles.textarea}
            rows="1" // Adjust rows as needed for height
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={styles.label} htmlFor="reply"></label>
          <textarea
            id="reply"
            value={cReply}
            onChange={(e) => setcReply(e.target.value)}
            style={styles.textarea}
            rows="1" // Adjust rows as needed for height
          />
        </div>

        <button style={styles.button} onClick={handleManagerReply}>
          Send Reply
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};



export default ManagerReply;
