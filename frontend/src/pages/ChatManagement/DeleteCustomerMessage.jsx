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



export default DeleteCustomerMessage;
