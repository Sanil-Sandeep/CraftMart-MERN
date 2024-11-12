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

const styles = {
  page: {
    backgroundColor: '#fff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '1rem',
    fontFamily: 'Poppins, sans-serif',
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Poppins, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    color: '#330D0F', 
    fontWeight: 'bold',
  },
  title: {
    fontSize: '1.875rem',
    margin: '2rem 0',
    fontFamily: 'Poppins, sans-serif',
  },
  addIcon: {
    fontSize: '2rem',
    fontFamily: 'Poppins, sans-serif',
  },
  reportButton: {
    marginLeft: '0.1rem',
    marginBottom: '2rem',
    padding: '0.5rem 1rem',
    fontSize: '0.88rem',
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#330D0F',
    border: '2px solid #330D0F',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  searchInput: {
    width: '300px',
    padding: '0.5rem',
    fontSize: '0.8rem',
    borderRadius: '0.25rem',
    border: '3px solid #330D0F',
    fontFamily: 'Poppins, sans-serif',
  },
  searchButton: {
    marginLeft: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '0.88rem',
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#330D0F',
    border: '2px solid #330D0F',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderSpacing: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
    tableLayout: 'fixed', // Ensures columns are fixed in width
  },
  th: {
    borderTop: '3px solid #330D0F',
    borderBottom: '3px solid #330D0F',
    borderLeft: '3px solid #330D0F',
    borderRight: '3px solid #F1EEDA',
    backgroundColor: '#4A1416',
    color: '#FFFFFF',
    height: '3rem',
    fontFamily: 'Poppins, sans-serif',
    overflow: 'hidden', // Hide overflow
    whiteSpace: 'nowrap', // Prevent text from wrapping
    textOverflow: 'ellipsis', // Add ellipsis if content is too long
  },
  thLast: {
    borderRight: '3px solid #330D0F',
    fontFamily: 'Poppins, sans-serif',
  },
  td: {
    border: '3px solid #330D0F',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    wordWrap: 'break-word', // Break long words to fit within the cell
    overflow: 'hidden', // Hide overflow
    textOverflow: 'ellipsis', // Add ellipsis if content is too long
  },
  operations: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    fontFamily: 'Poppins, sans-serif',
  },
  icon: {
    fontSize: '1.5rem',
    fontFamily: 'Poppins, sans-serif',
  },
  noResults: {
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    color: '#330D0F',
    fontSize: '1.25rem',
    marginTop: '2rem',
  },
};

export default FeedbackDashboard;
