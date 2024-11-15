import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductSingleCard from './GiftSingleCard';

const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleCategoryClick = (category) => {
    navigate(`/gifts/${category}`);
  };

  return (
    <>
      <style>
        {`
          .product-card-container {
            min-height: 100vh;
            background-color: #ffffff !important; 
            display: flex;
            flex-direction: column;
            padding: 10rem;
          }
          .category-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
          }
          .category-button {
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            background-color: #3b82f6;
            color: white;
            border: none;
            cursor: pointer;
          }
          .category-button:hover {
            background-color: #2563eb;
          }
          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
          }
          .no-products {
            text-align: center;
            font-size: 1.2rem;
            color: #555;
          }
        `}
      </style>

      <div className="product-card-container">
        {/* Category Buttons */}
        

        {/* Display All Products */}
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductSingleCard key={item._id} product={item} />
            ))
          ) : (
            <p className="no-products">No products available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
