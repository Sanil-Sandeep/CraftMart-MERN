import React, { useState } from 'react';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const DeleteDelivery = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteDelivery = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/deliverys/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('delivery is deleted successfully', { variant: 'success' });
        navigate('/products/card'); // Redirect to homepage or desired page
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting delivery', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      {loading ? <Spinner /> : null}
      <div style={styles.form}>
        <h3 style={styles.heading}>Are You Sure You Want to Delete This ?</h3>
        <button
          style={styles.buttonDelete}
          onClick={handleDeleteDelivery}
        >
          Yes, Delete it
        </button>
        <button
          style={styles.buttonCancel}
          onClick={() => {
            navigate('/deliverys'); // Redirect to homepage or desired page
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


export default DeleteDelivery;
