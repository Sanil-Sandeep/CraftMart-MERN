import React, { useState } from 'react';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../../components/headerfooter/Header';
import Footer from '../../../components/headerfooter/Footer';

const DeletePayment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeletePayment = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/payments/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Payment deleted successfully', { variant: 'success' });
        navigate('/products/card');
      })
      .catch((error) => {
        setLoading(false);
      //alert('An error happened. Please check console');
        enqueueSnackbar('Error', {variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      {loading ? <Spinner /> : null}
      <div style={styles.form}>
        <h3 style={styles.heading}>Are You Sure You Want to Delete Your Payment Details?</h3>

        <button
          style={styles.buttonDelete}
          onClick={handleDeletePayment}
        >
          Yes, Delete it
        </button>
        <button
          style={styles.buttonCancel}
          onClick={() => {
            navigate('/products/card'); // Redirect to homepage or desired page
          }}
        >
          No
        </button>
      </div>
    </div>
    <Footer/>
    </div>
  );
};


export default DeletePayment;
