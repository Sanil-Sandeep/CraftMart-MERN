import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/spinner';
import ProductSingleCard from '../../components/home/ProductSingleCard';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ProductsCardPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/products')
      .then((response) => {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(e.target.value.toLowerCase()) ||
      product.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`); // Navigate to category page
  };

  return (
    <div>
      <Header />
    <div style={styles.pageContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div style={styles.buttonContainer}>
            {['masks', 'sculptures', 'furniture'].map(category => (
              <div 
                key={category}
                style={styles.categoryButton} 
                onClick={() => handleCategoryClick(category)}
              >
                <img 
                  src={`http://localhost:5555/uploads/${category}A.jpg`} 
                  alt={category} 
                  style={styles.buttonImage} 
                />
                <span style={styles.buttonText}>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </div>
            ))}
          </div>

          <div style={styles.searchButtonContainer}>
            <div style={styles.searchInputContainer}>
              <FaSearch style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by product name or category"
                value={searchQuery}
                onChange={handleSearch}
                style={styles.searchInput}
              />
            </div>
          </div>

          <div style={styles.productGrid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductSingleCard key={item._id} product={item} />
              ))
            ) : (
              <p style={styles.noProducts}>No products available.</p>
            )}
          </div>
        </>
      )}
    </div>
    <Footer />
    </div>
  );
};



export default ProductsCardPage;
