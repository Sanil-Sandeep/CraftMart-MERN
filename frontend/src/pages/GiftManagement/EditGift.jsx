import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const EditGift = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [b_price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [percentage, setPercentage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/gifts/${id}`)
      .then((response) => {
        setProductName(response.data.productName);
        setDescription(response.data.description);
        setPrice(response.data.b_price);
        setImage(response.data.image); // Set image URL for display
        setPercentage(response.data.percentage);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred while fetching product details.', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditProducts = () => {
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('b_price', b_price); // Use 'b_price' to match the backend
    formData.append('percentage', percentage);

    if (image) {
      formData.append('image', image); // Append new image if provided
    }

    setLoading(true);
    axios.put(`http://localhost:5555/gifts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Product Edited Successfully!', { variant: 'success' });
      navigate('/gifts'); // Navigate back to the products list
    })
    .catch((error) => {
      setLoading(false);
      enqueueSnackbar('Error updating product.', { variant: 'error' });
      console.log(error);
    });
  };

  return (
    <div>
      <Header />
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Edit Gift</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Product Name</label>
          <input 
            type='text'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input 
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Image</label>
          <input
            type='file'
            onChange={(e) => setImage(e.target.files[0])}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>B_Price</label>
          <input 
            type='number'
            value={b_price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Percentage</label>
          <input 
            type='number'
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditProducts}>
          Save
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default EditGift;
