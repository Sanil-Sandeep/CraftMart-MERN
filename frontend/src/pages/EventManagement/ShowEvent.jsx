import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner'; // Import the Spinner component
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ShowEvent = () => {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <div>
      <Header />
    <div style={styles.container}>
      <h1 style={styles.title}>Event Details</h1>
      {loading ? (
        <Spinner /> // Show the spinner while loading
      ) : (
        <div style={styles.detailsWrapper}>
          <div style={styles.leftSide}>
            {event.image ? (
              <img
                src={`http://localhost:5555${event.image}`} 
                alt={event.title}
                style={styles.image}
              />
              
            ) : (
              <p style={styles.noImage}>No Image Available</p>
            )}
          </div>
          
          

          <div style={styles.rightSide}>
            <div style={styles.eventDetail}>
              <span style={styles.label}>Title: </span>
              <p style={styles.detailText}>{event.title}</p>
            </div>
            <div style={styles.eventDetail}>
              <span style={styles.label}>Date: </span>
              <p style={styles.detailText}>{new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div style={styles.eventDetail}>
              <span style={styles.label}>Time: </span>
              <p style={styles.detailText}>{event.time}</p>
            </div>
            <div style={styles.eventDetail}>
              <span style={styles.label}>Category: </span>
              <p style={styles.detailText}>{event.category || 'Uncategorized'}</p>
            </div>
            <div style={styles.eventDetail}>
              <span style={styles.label}>Description: </span>
              <p style={styles.detailText}>{event.description}</p>
            </div>
            {/* Add Zoom link section */}
            {event.zoomLink && (
              <div style={styles.eventDetail}>
                <span style={styles.label}>Zoom Link: </span>
                <a 
                  href={event.zoomLink} 
                  style={styles.zoomLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Join Event
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

// Updated Inline styles
const styles = {
  container: {
    padding: '2rem',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
     // Use backticks for template literals
    backgroundSize: 'cover', // Ensure the background covers the entire area
    backgroundPosition: 'center', // Center the background image
  },
  title: {
    fontSize: '2.5rem',
    margin: '1rem 0',
    textAlign: 'center',
    color: '#330D0F',
    fontWeight: 'bold',
  },
  detailsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '900px',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: '1rem',
    padding: '2rem',
    border: '1px solid #E1E1E1',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
  },
  leftSide: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '2rem',
  },
  rightSide: {
    flex: '2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '1rem',
  },
  eventDetail: {
    marginBottom: '1rem',
    fontSize: '1rem',
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#330D0F',
  },
  detailText: {
    fontSize: '1rem',
    color: '#555',
  },
  image: {
    width: '300px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '0.5rem',
    border: '1px solid #E1E1E1',
    marginTop: '1rem',
  },
  noImage: {
    color: '#888',
    fontSize: '1rem',
    marginTop: '1rem',
  },
  zoomLink: {
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default ShowEvent;
