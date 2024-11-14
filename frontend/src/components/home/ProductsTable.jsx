import React from "react";
import { Link } from "react-router-dom";
import "../ProductCss/ProductTable.css";

const ProductsTable = ({ products }) => {
  return (
    <table className="products-Table">
      <thead>
        <tr>
          <th className="table-Header">No</th>
          <th className="table-Header">Product Name</th>
          <th className="table-Header hidden-md">Category</th>
          <th className="table-Header hidden-md">Image</th>
          <th className="table-Header hidden-md description-column">Description</th>
          <th className="table-Header hidden-md">Price</th>
          <th className="table-Header hidden-md">Stock</th>
          <th className="table-Header operations-column">Operations</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product, index) => (
            <tr key={product._id} className="table-Row">
              <td className="table-Data">{index + 1}</td>
              <td className="table-Data">{product.productName}</td>
              <td className="table-Data hidden-md">{product.category}</td>
              <td className="table-Data hidden-md">
                {product.image ? (
                  <img
                    src={`http://localhost:5555${product.image}`}
                    alt={product.productName}
                    className="Product-Image"
                  />
                ) : (
                  <p>No Image</p>
                )}
              </td>
              <td className="table-Data hidden-md description-column">{product.description}</td>
              <td className="table-Data hidden-md">
                {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(product.price)}
              </td>
              <td className="table-Data hidden-md">{product.stock || 0}</td>
              <td className="table-Data operations-column">
                <div className="actions">
                  <Link to={`/products/details/${product._id}`}>
                    <button className="View-button">View</button>
                  </Link>
                  <Link to={`/products/edit/${product._id}`}>
                    <button className="Edit-button">Edit</button>
                  </Link>
                  <Link to={`/products/delete/${product._id}`}>
                    <button className="Delete-button">Delete</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="table-Data"> 
              No products available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductsTable;
