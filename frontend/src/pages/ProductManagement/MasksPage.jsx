import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductSingleCard from "../../components/home/ProductSingleCard";
import Spinner from '../../components/spinner';
import { FaSearch } from 'react-icons/fa';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const MasksPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/products?category=mask")
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
    <div style={styles.pageContainer}>
      {loading ? <Spinner /> : (
        <>
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by product name"
              value={searchQuery}
              onChange={handleSearch}
              style={styles.searchInput}
            />
          </div>
          <div style={styles.productGrid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductSingleCard key={item._id} product={item} />
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </>
      )}
    </div>
    <Footer />
    </div>
  );
};



export default MasksPage;
