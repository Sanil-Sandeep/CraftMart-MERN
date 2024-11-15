import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../../components/GiftManagementCss/DeleteGift.css';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const DeleteGift = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteProducts = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/gifts/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Product Deleted Successfully!', { variant: 'success' });
        navigate('/gifts');
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
    <div className="container">
      {loading && <Spinner />}
      <div className="form">
        <h3>Are you sure you want to delete this Product?</h3>
        <button 
          className="button-delete"
          onClick={handleDeleteProducts}
        >
          Yes, Delete It
        </button>
        <button 
          className="button-cancel"
          onClick={() => navigate('/gifts')}
        >
          Cancel
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default DeleteGift;
