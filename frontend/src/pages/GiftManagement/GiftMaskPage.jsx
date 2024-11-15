import React, { useEffect, useState } from "react";
import axios from "axios";
import GiftSingleCard from "../../components/GiftHome/GiftSingleCard";
import Spinner from '../../components/spinner';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const MasksPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/gifts?category=mask")
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Header />
    <div className="p-4">
      {loading ? <Spinner /> : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
          {products.length > 0 ? (
            products.map((item) => (
              <ProductSingleCard key={item._id} product={item} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default MasksPage;
