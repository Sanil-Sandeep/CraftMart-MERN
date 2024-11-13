import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer'

const CreateEvents = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [zoomLink, setZoomLink] = useState(''); // Updated state for Zoom Link
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isValid12HourTime = (time) => {
    const regex = /^((0[1-9]|1[0-2]):([0-5][0-9])\s(AM|PM))$/;
    return regex.test(time);
  };

  const isUppercaseTitle = (title) => /^[A-Z\s]+$/.test(title);

  // Validate Zoom Link format
  const isValidZoomLink = (link) => {
    return /^https:\/\//.test(link); // Ensure link starts with https://
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    setError('');
    const upperCaseTitle = title.toUpperCase();

    // Validate time format
    if (!isValid12HourTime(time)) {
      setError('Please enter a valid time in the format hh:mm AM/PM.');
      return;
    }

    // Validate title is uppercase
    if (!isUppercaseTitle(upperCaseTitle)) {
      setError('Title should be in uppercase letters.');
      return;
    }

    // Validate Zoom Link format
    if (!isValidZoomLink(zoomLink)) {
      setError('Zoom link must start with https://');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5555/events?title=${upperCaseTitle}`);
      if (response.data.length > 0) {
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
      await axios.post('http://localhost:5555/events', formData, {
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
      <h1 style={styles.title}>Create Event</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSaveEvent} style={styles.formContainer}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Event Name</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value.toUpperCase())}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Category</label>
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Date</label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
            min={new Date().toISOString().split('T')[0]}  // Restrict past dates
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Time</label>
          <input
            type='text'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={styles.input}
            placeholder="hh:mm AM/PM"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Zoom Link</label>
          <input
            type='text'
            value={zoomLink}
            onChange={(e) => setZoomLink(e.target.value)}
            style={styles.input}
            placeholder="Enter valid Zoom link"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Image</label>
          <input
            type='file'
            onChange={handleImageChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
    <Footer />
    </div>
  );
};



export default CreateEvents;
