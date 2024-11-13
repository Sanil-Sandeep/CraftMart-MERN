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



export default ShowEvent;
