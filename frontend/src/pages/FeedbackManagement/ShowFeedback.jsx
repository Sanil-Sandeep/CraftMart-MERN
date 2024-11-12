import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ShowFeedback = () => {
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/feedbacks/${id}`)
      .then((response) => {
        setFeedback(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleEditClick = () => {
    navigate(`/feedbacks/reply/${feedback._id}`);
  };

  return (
    <div>
      <Header />
    <div style={styles.page}>
      <div style={styles.header}>
      </div>
      <h1 style={styles.title}>{feedback.name}'s Feedback Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.feedbackContainer}>
          <div style={styles.feedbackItem}>
            <span style={styles.label}>Id:</span>
            <span style={styles.value}>{feedback._id}</span>
          </div>
          <div style={styles.feedbackItem}>
            <span style={styles.label}>Name:</span>
            <span style={styles.value}>{feedback.name}</span>
          </div>
          <div style={styles.feedbackItem}>
            <span style={styles.label}>Email:</span>
            <span style={styles.value}>{feedback.email}</span>
          </div>
          <div style={styles.feedbackItem}>
            <span style={styles.label}>Feedback:</span>
            <div style={styles.message}>{feedback.message}</div>
          </div>
          {feedback.reply && (
            <div style={styles.feedbackItem}>
              <span style={styles.label}>Reply:</span>
              <div style={styles.message}>{feedback.reply}</div>
            </div>
          )}
          <div style={styles.feedbackItem}>
            <span style={styles.label}>Created Time:</span>
            <span style={styles.value}>{new Date(feedback.createdAt).toLocaleString()}</span>
          </div>
          <div style={styles.feedbackItem}>
            <span style={styles.label}>Last Updated Time:</span>
            <span style={styles.value}>{new Date(feedback.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}
      <button style={styles.editButton} onClick={handleEditClick}>
            Reply
      </button>
    </div>
    <Footer />
    </div>
  );
};




export default ShowFeedback;
