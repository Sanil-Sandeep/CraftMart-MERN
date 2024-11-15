import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/spinner";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import GiftTable from '../../components/GiftHome/GiftTable'
import "../../components/GiftManagementCss/Giftdashboard.css"; 
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/gifts")
      .then((response) => {
        console.log(response.data.data);
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
    <div className="home-container">
      <div className="button-container">
        <button
          className="button button-table"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="button button-card"
          onClick={() => navigate("/gifts/card")}
        >
          Card
        </button>
      </div>
      <div className="header-container">
        <h1 className="text-3xl">Gift Management</h1>
        <Link to="/gifts/create">
          <button className="add-button">Add</button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <GiftTable products={products} />
      ) : null}
    </div>
    <Footer />
    </div>
  );
};

export default Home;
