import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/GiftManagementCss/GiftDetailsPage.css'; 
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const GiftDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/gifts/${id}`);
        setProduct(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Product not found");
        } else {
          setError("An error occurred while fetching the product");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div>
      <Header />
    <div className="container">
      <div className="product-details-container">
        {/* Left Side: Product Image */}
        <div className="product-image-container">
          <img
            src={`http://localhost:5555${product.image}`}
            alt={product.productName}
            className="product-image"
          />
        </div>

        {/* Right Side: Product Details with Border */}
        <div className="product-info-container">
          <h1 className="title">{product.productName}</h1>
          <p className="description">{product.description}</p>

          <div className="price-buy-container">
            
            <p className="price">${product.final_price}</p>
            <button className="button buy-button">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default GiftDetailsPage;
