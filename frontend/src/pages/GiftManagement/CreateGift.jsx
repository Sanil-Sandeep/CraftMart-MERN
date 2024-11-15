import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import '../../components/GiftManagementCss/CreateGift.css';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/spinner';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const CreateGift = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [b_price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [percentage, setPercentage] = useState('');
  const [final_price, setFinal] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Calculate final price whenever b_price or percentage changes
  useEffect(() => {
    if (b_price && percentage) {
      const calculatedFinalPrice = parseFloat(b_price) - (parseFloat(b_price) * (parseFloat(percentage) / 100));
      setFinal(calculatedFinalPrice.toFixed(2)); // Fix to 2 decimal places
    } else {
      setFinal('');
    }
  }, [b_price, percentage]);

  const handleSaveProduct = async () => {
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('b_price', parseFloat(b_price));
    formData.append('percentage', parseFloat(percentage));
    formData.append('final_price', parseFloat(final_price));
    
    if (image) {
      formData.append('image', image);
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5555/gifts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      enqueueSnackbar('Product Created Successfully!', { variant: 'success' });
      navigate('/gifts');
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message || 'Error creating product', { variant: 'error' });
      } else if (error.request) {
        enqueueSnackbar('Network error. Please try again later.', { variant: 'error' });
      } else {
        enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
      }
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
    <div className='container'>

      <h1 className='title'>Create Gift</h1>
      {loading && <Spinner />}
      <div className='form-container'>
        <div className='input-group'>
          <label className='label'>Product Name</label>
          <input
            type='text'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className='input'
          />
        </div>
        <div className='input-group'>
          <label className='label'>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='input'
          />
        </div>
        
        <div className='input-group'>
          <label className='label'>Image</label>
          <input
            type='file'
            onChange={(e) => setImage(e.target.files[0])}
            className='file-input'
          />
        </div>

        <div className='input-group'>
          <label className='label'>b_Price</label>
          <input
            type='number'
            value={b_price}
            onChange={(e) => setPrice(e.target.value)}
            className='input'
          />
        </div>

        <div className='input-group'>
          <label className='label'>Percentage</label>
          <input
            type='number'
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className='input'
          />
        </div>

        <div className='input-group'>
          <label className='label'>Final Price</label>
          <input
            type='number'
            value={final_price}
            readOnly
            className='input'
          />
        </div>

        <button className='button' onClick={handleSaveProduct}>
          Save
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default CreateGift;
