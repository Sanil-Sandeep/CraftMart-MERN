import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GiftSingleCard = ({ product }) => {
  const [showModel, setShowModel] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg p-2 m-2 relative hover:shadow-lg transition-shadow duration-300 ease-in-out max-w-xs">
      {/* Link to ProductDetailsPage */}
      <Link to={`s/${product._id}`}>
        {/* Product Image */}
        <img
          src={`http://localhost:5555${product.image}`}
          alt={product.productName}
          className="w-full h-32 object-cover rounded-md mb-1"
        />

        {/* Product Name */}
        <h2 className="text-sm font-medium text-gray-700">{product.productName}</h2>
      </Link>

      {/* Product Price */}
      <h3 className="text-md text-red-600 font-semibold mt-1">${product. final_price}</h3>

      {/* Modal for showing product details */}
      {showModel && (
        <ProductModel product={product} onClose={() => setShowModel(false)} />
      )}
    </div>
  );
};

export default GiftSingleCard;
