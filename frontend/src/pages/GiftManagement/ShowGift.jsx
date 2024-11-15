import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from "../../components/spinner";
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ShowGift = () => {
  const [product, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/gifts/${id}`)
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
    <div className='p-4'>
  
      <h1 className='text-3xl my-4'>Show Gifts</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='m-4'>
            <span className='text-xl me-4 text-gray-500'>Product Name</span>
            <span>{product.productName}</span>
          </div>
          <div className='m-4'>
            <span className='text-xl me-4 text-gray-500'>Description</span>
            <span>{product.description}</span>
          </div>
          <div className='m-4'>
            <span className='text-xl me-4 text-gray-500'>B_Price</span>
            <span>{product.b_price}</span>
          </div>
          <div className='m-4'>
            <span className='text-xl me-4 text-gray-500'>Percentage</span>
            <span>{product.percentage}</span>
          </div>
          <div className='m-4'>
            <span className='text-xl me-4 text-gray-500'>Final Price</span>
            <span>{product.final_price}</span>
          </div>
          <div className='m-4'>
            <span className='text-xl me-4 text-gray-500'>Create Time</span>
            <span>{new Date(product.createdAt).toString()}</span>
          </div>
          <div className='m-4'>
            <span className='text-xl me-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(product.updatedAt).toString()}</span>
          </div>
          <div className='m-4'>
            <span className='text-xl me-4 text-gray-500'>Image</span>
            {product.image ? (
              <img src={`http://localhost:3000/uploads/${product.image}`}  alt={product.productName} className="w-40 h-40 object-cover" />
            ) : (
              <p>No Image Available</p>
            )}
          </div>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
}

export default ShowGift;
