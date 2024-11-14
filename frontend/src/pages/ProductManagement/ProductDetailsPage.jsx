import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/ProductCss/ProductDetailsPage.css'; 
import { addToCart } from "../PaymentManagement/Cart/utils/cart";
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/products/${id}`);
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

  const handleAddToCart = async () => {
    if (product.stock < quantity) {
      setError("Insufficient stock available");
      return;
    }

    try {
      // Update stock in the backend before adding to cart
      await axios.post(`http://localhost:5555/products/purchase/${product._id}`, {
        quantity,
      });

      // Add to cart
      addToCart({
        productName: product.productName,
        price: product.price,
        quantity: parseInt(quantity),
      });
      navigate('/cart');
    } catch (error) {
      setError("An error occurred while updating stock");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  const formattedPrice = new Intl.NumberFormat('en-SL', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
  }).format(product.price);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="product-details-container">
          {/* Left Side: Product Image */}
          <div className="product-Image-container">
            <img
              src={`http://localhost:5555${product.image}`}
              alt={product.productName}
              className="product-Image"
            />
          </div>

          {/* Right Side: Product Details */}
          <div className="product-info-container">
            <h1 className="title">{product.productName}</h1>
            <p className="description">{product.description}</p>
            {/* Price and Buy Button in the same row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p className="price" style={{ marginBottom: '10px' }}>{formattedPrice}</p>
              <button
                className="button buy-button"
                onClick={handleAddToCart}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4169E1',
                  color: '#fff',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Buy Now
              </button>
            </div>

            {/* Quantity Selector Below the Price */}
            <div className="quantity-selector" style={{ marginTop: '10px' }}>
              <label
                htmlFor="quantity"
                className="quantity-label"
                style={{ marginRight: '8px', fontWeight: 'bold' }}
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                style={{
                  width: '60px',
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  textAlign: 'center',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
