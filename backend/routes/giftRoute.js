import express from 'express';
import multer from 'multer';
import path from 'path';
import { Gift } from '../models/GiftModell.js'; // Ensure the model path is correct

const router = express.Router();

// Set up multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Route to save a new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { productName, description, b_price, percentage } = req.body;

    // Validate required fields
    if (!productName || !description || !b_price || !percentage) {
      return res.status(400).json({ message: 'Please provide productName, description, b_price, and percentage' });
    }

    // Handle the image file path
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    // Calculate final price
    const final_price = b_price - (b_price * (percentage / 100));

    const newProduct = {
      productName,
      description,
      b_price,        // Use 'b_price' as intended
      image,
      final_price,
      percentage,
    };

    // Insert the product into the database
    const product = await Gift.create(newProduct);
    return res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error code
      return res.status(400).json({ message: 'Duplicate productID value' });
    }
    console.error('Error: ', error); // Log detailed error
    return res.status(500).json({ message: 'Server error', error: error.message }); // Send detailed error message
  }
});

// Route to get all products (with optional category filtering)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query; // Handle category filter
    const query = category ? { category } : {};
    const products = await Gift.find(query);
    return res.status(200).json({ count: products.length, data: products });
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Gift.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to update a product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, b_price, percentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    // Calculate final price
    const final_price = b_price - (b_price * (percentage / 100));

    // Validate required fields
    if (!productName || !description || !b_price || !percentage) {
      return res.status(400).json({ message: 'Please provide productName, description, b_price, and percentage' });
    }

    // Find the product and update it
    const updateData = {
      productName,
      description,
      b_price,
      percentage,
      final_price,
      
    };

    if (image) updateData.image = image;

    const updatedProduct = await Gift.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error code
      return res.status(400).json({ message: 'Duplicate productID value' });
    }
    console.error('Error: ', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Gift.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
