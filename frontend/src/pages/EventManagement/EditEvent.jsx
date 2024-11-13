import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/spinner'; // Import the Spinner component
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const EditEvent = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [zoomLink, setZoomLink] = useState(''); // New state for Zoom Link
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  // Get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/events/${id}`)
      .then((response) => {
        setCategory(response.data.category);
        setDate(response.data.date);
        setTime(response.data.time);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setZoomLink(response.data.zoomLink || ''); // Set the Zoom link if it exists
        setExistingImage(response.data.image);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console for details.');
        console.log(error);
      });
  }, [id]);

  const isValid12HourTime = (timeStr) => {
    const timePattern = /^([1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM)$/i;
    return timePattern.test(timeStr);
  };

  const isUppercaseTitle = (title) => /^[A-Z\s]+$/.test(title);

  // Updated Zoom link validation to check for 'https://'
  const isValidZoomLink = (link) => {
    return link.startsWith('https://');
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEditEvent = async () => {
    if (!isValid12HourTime(time)) {
      setError('Time must be in 12-hour format (e.g., "2:30 PM").');
      return;
    }

    const upperCaseTitle = title.toUpperCase();
    if (!isUppercaseTitle(upperCaseTitle)) {
      setError('Title should be in uppercase letters.');
      return;
    }

    if (!isValidZoomLink(zoomLink)) {
      setError('Please enter a valid Zoom link starting with "https://".');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5555/events?title=${upperCaseTitle}`);
      if (response.data.length > 0 && response.data[0]._id !== id) {
        setError('Title must be unique.');
        return;
      }

      const formData = new FormData();
      formData.append('title', upperCaseTitle);
      formData.append('category', category);
      formData.append('date', date);
      formData.append('time', time);
      formData.append('description', description);
      formData.append('zoomLink', zoomLink); // Add the Zoom link to the form data
      if (image) formData.append('image', image);

      setLoading(true);
      setError('');

      await axios.put(`http://localhost:5555/events/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      navigate('/events');
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please check the console for details.');
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      <h1 style={styles.title}>Edit Event</h1>
      {loading && <Spinner />} {/* Show the spinner while loading */}
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.formContainer}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Title :</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Category :</label>
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Date :</label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
            min={getCurrentDate()} // Restrict to future dates
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Time :</label>
          <input
            type='text'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={styles.input}
            placeholder='e.g., 2:30 PM'
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Description :</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Zoom Link :</label> {/* New Zoom Link input */}
          <input
            type='url'
            value={zoomLink}
            onChange={(e) => setZoomLink(e.target.value)}
            style={styles.input}
            placeholder='Enter Zoom link'
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Image :</label>
          <input
            type='file'
            onChange={handleImageChange}
            style={styles.input}
          />
          {existingImage && (
            <img
              src={existingImage}
              alt='Event'
              style={styles.imagePreview}
            />
          )}
        </div>
        <button style={styles.button} onClick={handleEditEvent} disabled={loading}>
          Save
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    margin: '0 0 1.5rem',
    textAlign: 'center',
    color: '#330D0F',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: '2.5px solid #E1E1E1',
    borderRadius: '0.75rem',
    backgroundColor: '#FFFFFF',
    padding: '2rem',
    boxShadow: '0 3.75px 6px rgba(0, 0, 0, 0.9)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  inputGroup: {
    margin: '1rem 0',
  },
  label: {
    display: 'block',
    fontSize: '0.9375rem',
    marginBottom: '0.5rem',
    color: '#330D0F',
    fontWeight: 'bold',
  },
  input: {
    border: '2.5px solid #E1E1E1',
    padding: '0.75rem',
    width: '100%',
    borderRadius: '0.75rem',
    fontSize: '1rem',
  },
  imagePreview: {
    marginTop: '1rem',
    maxWidth: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
  },
  error: {
    marginTop: '0.5rem',
    color: 'red',
    fontSize: '0.9rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#330D0F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
  },
};

export default EditEvent;
