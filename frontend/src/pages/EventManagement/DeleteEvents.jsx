import React, { useState } from 'react';
import Spinner from '../../components/spinner'; // Ensure this component is correctly implemented
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const DeleteEvent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteEvent = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/events/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/events'); // Redirect after successful deletion
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred while deleting the event. Please try again.');
        console.error(error);
      });
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      {loading ? <Spinner /> : null}
      <div style={styles.form}>
        <h3 style={styles.heading}>Are You Sure You Want to Delete This Event?</h3>
        <button
          style={styles.buttonDelete}
          onClick={handleDeleteEvent}
        >
          Yes, Delete it
        </button>
        <button
          style={styles.buttonCancel}
          onClick={() => navigate('/events')} // Redirect to homepage or desired page
        >
          No
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};



export default DeleteEvent;
