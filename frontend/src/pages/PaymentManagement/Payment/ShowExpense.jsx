import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/headerfooter/Header';
import Footer from '../../../components/headerfooter/Footer';

const ShowExpense = () => {
  const [expense, setExpense] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/expenses/${id}`)
      .then((response) => {
        setExpense(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    // Implement delete functionality here
    navigate(`/expenses/delete/${expense._id}`);
  };

  const handleEdit = () => {
    navigate(`/expenses/edit/${expense._id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Header/>
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        {/* Assuming you have a back button component */}
        <h1 style={styles.title}>Expense Details</h1>
        <div id="receipt-content" style={styles.receipt}>
          <div style={styles.header}>
            <h2 style={styles.companyName}>CraftMart</h2>
            <p style={styles.receiptNumber}>Expense ID: {expense._id}</p>
          </div>
          <div style={styles.details}>
             <div style={styles.row}>
                <span style={styles.label}>ID :</span>
                <span style={styles.value}>{expense.eID}</span>
             </div>
             <div style={styles.row}>
                <span style={styles.label}>Name :</span>
                <span style={styles.value}>{expense.name}</span>
             </div>
             <div style={styles.row}>
                <span style={styles.label}>Expense :</span>
                <span style={styles.value}>{expense.expense}</span>
             </div>
             <div style={styles.row}>
                <span style={styles.label}>Amount :</span>
                <span style={styles.value}>{expense.cost}</span>
             </div>
              <div style={styles.row}>
                <span style={styles.label}>Create Time:</span>
                <span style={styles.value}>{new Date(expense.createdAt).toLocaleString()}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Last Update Time:</span>
                <span style={styles.value}>{new Date(expense.updatedAt).toLocaleString()}</span>
              </div>
          </div>
        </div>
        <div style={styles.buttonContainer}>
          <button style={{ ...styles.button, ...styles.deleteButton }} onClick={handleDelete}>Delete</button>
          <button style={{ ...styles.button, ...styles.editButton }} onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};



export default ShowExpense;
