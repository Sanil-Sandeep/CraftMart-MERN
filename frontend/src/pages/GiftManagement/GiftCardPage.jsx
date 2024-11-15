// src/components/home/ProductsCardPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from '../../components/spinner';
import ProductsCard from "../../components/GiftHome/GiftCard";
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const GiftCardPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/gifts")
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
      {loading ? <Spinner /> : <ProductsCard products={products} />}
    </div>
    <Footer />
    </div>
  );
};

export default GiftCardPage;
