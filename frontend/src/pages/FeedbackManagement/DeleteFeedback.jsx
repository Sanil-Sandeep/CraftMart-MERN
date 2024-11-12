import React, { useState } from 'react';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const DeleteFeedback = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteFeedback = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/feedbacks/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Feedback Deleted Successfully', {variant: 'success'});
        navigate('/feedbacks/full');
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happened. Please check the console.');
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      {loading ? <Spinner /> : null}
      <div style={styles.form}>
        <h3 style={styles.heading}>Do You Want To Delete Your Feedback?</h3>

        <button
          style={styles.buttonDelete}
          onClick={handleDeleteFeedback}
        >
          Yes, Delete it
        </button>
        <button
          style={styles.buttonCancel}
          onClick={() => {  
            window.location.href = '/feedbacks/full';  // Redirect to the link
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



export default DeleteFeedback;
