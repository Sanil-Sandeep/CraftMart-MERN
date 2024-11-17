import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Header from '../../../components/headerfooter/Header';
import Footer from '../../../components/headerfooter/Footer';

const ShowPayment = () => {
  const [payment, setPayment] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/payments/${id}`)
      .then((response) => {
        setPayment(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    // Implement delete functionality here
    navigate(`/payments/delete/${payment._id}`);
  };

  const handleEdit = () => {
    navigate(`/payments/edit/${payment._id}`);
  };

  const handleReceipt = () => {
    const input = document.getElementById('receipt-content');
    html2canvas(input, { scale: 6 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      // Adjust the image dimensions to reduce the height
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Reduce the height of the PDF
      const reducedHeight = imgHeight * 1.00; // Adjust to fit content
  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, reducedHeight);
      pdf.save(`receipt_${payment._id}.pdf`);
    });
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
        <h1 style={styles.title}>Payment Receipt</h1>
        <div id="receipt-content" style={styles.receipt}>
          <div style={styles.header}>
            <h2 style={styles.companyName}>CraftMart</h2>
            <p style={styles.receiptNumber}>Receipt No: {payment._id}</p>
          </div>
          <div style={styles.details}>
          <div style={styles.row}>
                <span style={styles.label}>Customer Name:</span>
                <span style={styles.value}>{payment.cardHolderName}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Create Time:</span>
                <span style={styles.value}>{new Date(payment.createdAt).toLocaleString()}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Last Update Time:</span>
                <span style={styles.value}>{new Date(payment.updatedAt).toLocaleString()}</span>
              </div>
          </div>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.tableHeader}>Product Name</th>
                <th style={styles.tableHeader}>Price</th>
                <th style={styles.tableHeader}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {payment.productName && payment.productName.map((name, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{name}</td>
                  <td style={styles.tableCell}>LKR {payment.price[index]}</td>
                  <td style={styles.tableCell}>{payment.quantity[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.totalContainer}>
            <p style={styles.totalLabel}>Total Price:</p>
            <p style={styles.totalValue}>LKR {payment.totalPrice}</p>
          </div>
        </div>
        <div style={styles.buttonContainer}>
          <button style={{ ...styles.button, ...styles.deleteButton }} onClick={handleDelete}>Delete</button>
          <button style={{ ...styles.button, ...styles.editButton }} onClick={handleEdit}>Edit</button>
          <button style={{ ...styles.button, ...styles.receiptButton }} onClick={handleReceipt}>Download Receipt</button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};



export default ShowPayment;
