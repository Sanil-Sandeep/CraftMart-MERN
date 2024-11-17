import React, { useState } from 'react';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../../components/headerfooter/Header';
import Footer from '../../../components/headerfooter/Footer';

const DeleteExpense = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteExpense = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/expenses/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Expense deleted successfully', { variant: 'success' });
        navigate('/expenses');
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
        <h3 style={styles.heading}>Are You Sure You Want to Delete Your Expense Details?</h3>

        <button
          style={styles.buttonDelete}
          onClick={handleDeleteExpense}
        >
          Yes, Delete it
        </button>
        <button
          style={styles.buttonCancel}
          onClick={() => {
            navigate('/expenses'); // Redirect to homepage or desired page
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



export default DeleteExpense;
