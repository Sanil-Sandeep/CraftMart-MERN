import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from "../../components/spinner";
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ShowProducts = () => {
  const [product, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/products/${id}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Header />
    <div style={styles.container}>
      <h1 style={styles.title}>Product Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.detailsWrapper}>
          {/* Left: Product Name, Image, and Price */}
          <div style={styles.leftSide}>
            <h2 style={styles.productName}>{product.productName}</h2>
            {product.image ? (
              <img
                src={`http://localhost:5555${product.image}`}
                alt={product.productName}
                style={styles.image}
              />
            ) : (
              <p style={styles.noImage}>No Image Available</p>
            )}
            <div style={styles.price}>
              <span style={styles.label}>Price: </span>
              {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(product.price)}
            </div>
          </div>

          {/* Right: Product Details and Category */}
          <div style={styles.rightSide}>
            <div style={styles.productDetail}>
              <span style={styles.label}>Description: </span>
              <p style={styles.detailText}>{product.description}</p>
            </div>
            <div style={styles.productDetail}>
              <span style={styles.label}>Category: </span>
              <p style={styles.detailText}>{product.category || 'Uncategorized'}</p>
            </div>
            <div style={styles.productDetail}>
              <span style={styles.label}>Created At: </span>
              <p style={styles.detailText}>{new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
            <div style={styles.productDetail}>
              <span style={styles.label}>Last Updated At: </span>
              <p style={styles.detailText}>{new Date(product.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};



export default ShowProducts;
