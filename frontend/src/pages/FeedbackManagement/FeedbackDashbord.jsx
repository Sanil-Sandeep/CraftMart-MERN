import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../images/logo.png'
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/feedbacks')
      .then((response) => {
        setFeedbacks(response.data.data);
        setFilteredFeedbacks(response.data.data); // Initialize filteredFeedbacks with all feedbacks
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Handle search button click
  const handleSearch = () => {
    const results = feedbacks.filter((feedback) =>
      feedback.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFeedbacks(results);
  };

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();

     // Add Business Name
     doc.setFontSize(24);
     doc.setFont('Poppins', 'bold');
     doc.text('CraftMart', 14, 22);

     // Add the logo image
    const logoWidth = 45; // Adjust width as needed
    const logoHeight = 30; // Adjust height as needed
    doc.addImage(logo, 'PNG', 160, 10, logoWidth, logoHeight); // Add logo to the right side
   
     // Add Report Title
     doc.setFontSize(18);
     doc.setFont('Poppins', 'bold');
     doc.text('Feedback Report', 14, 32);
   
     // Add Report Generation Date
     const reportDate = new Date().toLocaleDateString();
     doc.setFontSize(12);
     doc.setFont('Poppins', 'normal');
     doc.text(`Date: ${reportDate}`, 14, 42);
   
     // Add a line break before the table
     doc.setDrawColor(0, 0, 0);
     doc.setLineWidth(1);
     doc.line(10, 45, 205, 45);
   

    const tableColumn = ["No", "Name", "Email", "Feedback", "Reply"];
    const tableRows = filteredFeedbacks.map((feedback, index) => [
      index + 1,
      feedback.name,
      feedback.email,
      feedback.message,
      feedback.reply || 'No reply',
    ]);

   // Generate Table
   doc.autoTable(tableColumn, tableRows, {
    startY: 50,
    theme: 'grid',
    headStyles: {
      fillColor: '#330D0F',
      textColor: '#FFFFFF',
      font: 'Poppins',
      fontSize: 8,
      halign: 'center',
    },
    bodyStyles: {
      font: 'Poppins',
      fontSize: 10,
    },
    margin: { left: 10, right: 14 },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },  // Center-aligned
      1: { cellWidth: 30, halign: 'center' }, // Center-aligned
      2: { cellWidth: 45, halign: 'center' },  // Right-aligned
      3: { cellWidth: 55, halign: 'center' },  // Right-aligned
      4: { cellWidth: 55, halign: 'center' },  // Right-aligned
    },
    styles: {
      cellPadding: 2,
      
    },
    didDrawPage: function (data) {
      // Add footer text
      doc.setFontSize(10);
      doc.text('Generated by Craftmart', 14, doc.internal.pageSize.height - 10);
    },
  });
    doc.save("feedback_report.pdf");
  };

  return (
    <div>
      <Header />
    <div style={styles.page}>
      <div>
            <Link to='/feedbacks/full'>
              <MdOutlineAddBox style={{ ...styles.addIcon, color: '#991b1b' }} /> {/* text-customRed-800 */}
            </Link>
            <Link to='/feedbacks/create'>
              <MdOutlineAddBox style={{ ...styles.addIcon, color: '#0284c7' }} /> {/* text-sky-800 */}
            </Link>
            
          </div>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Feedback Management</h1>
          
          <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by Name, Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchButton}>Search</button>
        </div>
        </div>

        

        {loading ? (
          <Spinner />
        ) : (
          <div style={styles.tableWrapper}>
            <button onClick={generatePDF} style={styles.reportButton}>Generate PDF Report</button>
            {filteredFeedbacks.length > 0 && (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>No</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Feedback</th>
                    <th style={styles.th}>Reply</th>
                    <th style={{ ...styles.th, ...styles.thLast }}>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeedbacks.map((feedback, index) => (
                    <tr key={feedback._id} style={{ height: '2rem' }}>
                      <td style={styles.td}>{index + 1}</td>
                      <td style={styles.td}>{feedback.name}</td>
                      <td style={styles.td}>{feedback.email}</td>
                      <td style={styles.td}>{feedback.message}</td>
                      <td style={styles.td}>{feedback.reply}</td>
                      <td style={styles.td}>
                        <div style={styles.operations}>
                          <Link to={`/feedbacks/details/${feedback._id}`}>
                            <BsInfoCircle style={{ ...styles.icon, color: '#047857' }} /> {/* Updated color to match the theme */}
                          </Link>
                          <Link to={`/feedbacks/delete/${feedback._id}`}>
                            <MdOutlineDelete style={{ ...styles.icon, color: '#dc2626' }} />
                          </Link>
                          <Link to={`/feedbacks/reply/${feedback._id}`}>
                            <AiOutlineEdit style={{ ...styles.icon, color: '#d97706' }} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {filteredFeedbacks.length === 0 && (
              <div style={styles.noResults}>No results found.</div>
            )}
          </div>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
};



export default FeedbackDashboard;
