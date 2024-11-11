import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/spinner';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ShowDelivery = () => {
  const [delivery, setDelivery] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/deliverys/${id}`)
      .then((response) => {
        setDelivery(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    navigate(`/deliverys/delete/${delivery._id}`);
  };

  const handleEdit = () => {
    navigate(`/deliverys/edit/${delivery._id}`);
  };

  return (
    <div>
      <Header />
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.title}>Shipping and Delivery Details</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div id="order-content" style={styles.receipt}>
            <div style={styles.header}>
              <p style={styles.receiptNumber}>Delivery ID: {delivery._id}</p>
            </div>
            <div style={styles.details}>
              <div style={styles.row}>
                <span style={styles.label}>Address:</span>
                <span style={styles.value}>{delivery.Address}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Postal Code:</span>
                <span style={styles.value}>{delivery.PostalCode}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Sender Name:</span>
                <span style={styles.value}>{delivery.SenderName}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Contact Number:</span>
                <span style={styles.value}>{delivery.ContactNumber}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Created At:</span>
                <span style={styles.value}>{new Date(delivery.createdAt).toLocaleString()}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Updated At:</span>
                <span style={styles.value}>{new Date(delivery.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
        <div style={styles.buttonContainer}>
          <button style={{ ...styles.button, ...styles.deleteButton }} onClick={handleDelete}>Delete</button>
          <button style={{ ...styles.button, ...styles.editButton }} onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};



export default ShowDelivery;
