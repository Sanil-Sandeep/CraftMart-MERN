import React, { useState } from 'react';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const DeleteProducts = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteProducts = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/products/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Product Deleted Successfully!', { variant: 'success' });
        navigate('/products');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting product', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      {loading && <Spinner />}
      <div style={styles.form}>
        <h3 style={styles.heading}>Are you sure you want to delete this Product?</h3>
        <div style={styles.buttonGroup}>
          <button 
            style={styles.buttonDelete}
            onClick={handleDeleteProducts}
          >
            Yes, Delete It
          </button>
          <button 
            style={styles.buttonCancel}
            onClick={() => navigate('/products')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};


export default DeleteProducts;
