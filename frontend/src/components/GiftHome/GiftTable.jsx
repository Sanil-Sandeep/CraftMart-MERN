import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../components/GiftManagementCss/GiftTable.css";
import logo from "../../images/logo.png";

const ProductsTable = ({ products, logoUrl }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm) ||
      product._id.toLowerCase().includes(searchTerm)
  );

  // Function to generate and print the report
  const printReport = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    const table = document.querySelector(".products-table").cloneNode(true);

    // Remove the "Operations" column
    const headers = table.querySelectorAll("th");
    const columnsToRemove = [headers.length - 1]; // Index of the "Operations" column

    headers.forEach((header, index) => {
      if (columnsToRemove.includes(index)) {
        header.remove();
      }
    });

    table.querySelectorAll("tr").forEach((row) => {
      row.querySelectorAll("td").forEach((cell, index) => {
        if (columnsToRemove.includes(index)) {
          cell.remove();
        }
      });
    });

    // Get the current date
    const today = new Date().toLocaleDateString();

    // HTML structure for the report
    printWindow.document.write("<html><head><title>CraftMart Report</title>");
    printWindow.document.write(`
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .report-title {
          font-size: 27px;
          font-weight: bold;
          margin: 10;
        } 
        .subtitle {
          font-size: 20px;
          margin: 5;
          color: black;
        }
        .logo {
          width: 170px;
          height: auto;
        }
        .date {
          font-size: 14px;
          color: black;
        }
        .products-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .products-table th, .products-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .products-table th {
          background-color: #281814; /* Set the background color for headers */
          color: white; /* Set the text color for headers */
        }
        .product-image {
          width: 50px; /* Adjust the size of images here */
          height: auto;
        }
        .separator {
          margin: 20px 0;
          border-bottom: 2px solid black;
        }
      </style>
    `);

    printWindow.document.write("</head><body>");

    // Add logo, title, subtitle, and date with a separator line
    printWindow.document.write(`
      <div class="header-container">
        <div>
          <h1 class="report-title">CraftMart</h1>
          <h2 class="subtitle">Gift Report</h2>
          <p class="date">Date: ${today}</p>
        </div>
        <img src="${logo}" alt="CraftMart Logo" class="logo" />
      </div>
      <div class="separator"></div>
    `);

    // Adding the table content
    printWindow.document.write(table.outerHTML);

    // Close the HTML and focus on the print window
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="products-table-container">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

      {/* Report Button */}
      <div className="report-container">
        <button onClick={printReport} className="report-button">
          Generate Report
        </button>
      </div>

      {/* Table */}
      <table className="products-table">
        <thead>
          <tr>
            <th className="table-header">No</th>
            <th className="table-header">Product Name</th>
            <th className="table-header hidden-md">Image</th>
            <th className="table-header hidden-md">Description</th>
            <th className="table-header hidden-md">b_Price</th>
            <th className="table-header hidden-md">Percentage</th>
            <th className="table-header hidden-md">Final Price</th>
            <th className="table-header hidden-md">Operations</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product._id} className="table-row">
              <td className="table-data">{index + 1}</td>
              <td className="table-data">{product.productName}</td>
              <td className="table-data hidden-md">
                {product.image ? (
                  <img
                    src={`http://localhost:5555${product.image}`}
                    alt={product.productName}
                    className="product-image"
                  />
                ) : (
                  <p>No Image</p>
                )}
              </td>
              <td className="table-data hidden-md">{product.description}</td>
              <td className="table-data hidden-md">{product.b_price}</td>
              <td className="table-data hidden-md">{product.percentage}</td>
              <td className="table-data hidden-md">{product.final_price}</td>
              <td className="table-data">
                <div className="actions">
                  <Link to={`/gifts/details/${product._id}`}>
                    <button className="view-button">View</button>
                  </Link>
                  <Link to={`/gifts/edit/${product._id}`}>
                    <button className="edit-button">Edit</button>
                  </Link>
                  <Link to={`/gifts/delete/${product._id}`}>
                    <button className="delete-button">Delete</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
