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

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#fff',
    minHeight: '70vh',
    fontFamily: 'Poppins, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px',
    width: '600px',
    padding: '32px',
    margin: 'auto',
    marginTop: '86px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
  },
  heading: {
    fontSize: '24px',
    margin: '16px 0',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#330D0F',
  },
  buttonDelete: {
    padding: '16px',
    backgroundColor: '#330D0F',
    color: '#ffffff',
    margin: '16px',
    width: '100%',
    border: 'none',
    borderRadius: '48px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  buttonCancel: {
    padding: '16px',
    backgroundColor: '#F1EEDA',
    color: '#330D0F',
    margin: '16px',
    width: '100%',
    border: '2px solid #330D0F',
    borderRadius: '48px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default DeleteEvent;
