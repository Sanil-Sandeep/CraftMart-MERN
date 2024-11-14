import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('mask'); // Default category
  const [stock, setStock] = useState(0); // Add stock field
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!productName) {
      newErrors.productName = 'Product name is required';
    }

    if (!description) {
      newErrors.description = 'Description is required';
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (isNaN(stock) || stock < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    if (image) {
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(image.type)) {
        newErrors.image = 'Only JPEG and PNG images are allowed';
      }
    }

    return newErrors;
  };

  const handleCreateProduct = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', parseFloat(price).toFixed(2));
    formData.append('category', category);
    formData.append('stock', stock); // Include stock in form data
    if (image) formData.append('image', image);

    setLoading(true);
    try {
      await axios.post('http://localhost:5555/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      enqueueSnackbar('Product created successfully!', { variant: 'success' });
      navigate('/products');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error creating product', { variant: 'error' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      <div style={styles.title}>
        <h1>Create Product</h1>
      </div>
      <div style={styles.formContainer}>
        {loading && <div style={styles.loading}>Loading...</div>}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={styles.input}
          />
          {errors.productName && <span style={styles.errorMessage}>{errors.productName}</span>}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
          {errors.description && <span style={styles.errorMessage}>{errors.description}</span>}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Price (LKR)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
          />
          {errors.price && <span style={styles.errorMessage}>{errors.price}</span>}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            style={styles.input}
          />
          {errors.stock && <span style={styles.errorMessage}>{errors.stock}</span>}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
          >
            <option value="mask">Mask</option>
            <option value="sculpture">Sculpture</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={styles.input}
          />
          {errors.image && <span style={styles.errorMessage}>{errors.image}</span>}
        </div>
        <div style={styles.buttonContainer}>
          <button onClick={handleCreateProduct} style={styles.button}>
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};



export default CreateProduct;
