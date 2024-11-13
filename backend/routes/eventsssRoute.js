import express from 'express';
import multer from 'multer';
import path from 'path';
import { Event } from '../models/eventsssModel.js'; 

const router = express.Router();

// Set up multer for file handling (same as in the product route)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Utility function to convert date format
const convertToISODate = (date) => {
  const [day, month, year] = date.split('/');
  return new Date(`${year}-${month}-${day}`);
};

// Route to save a new event
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, category, date, time, description, zoomLink } = req.body; // Include zoomLink
    const image = req.file ? `/uploads/${req.file.filename}` : ''; // Image path handling

    // Validate fields
    if (!title || !category || !date || !time || !description || !zoomLink) {
      return res.status(400).json({ message: 'Please provide title, category, date, time, description, and zoomLink' });
    }

    // Convert date to ISO format
    const formattedDate = convertToISODate(date);

    // Create new event object
    const newEvent = { title, category, date: formattedDate, time, description, image, zoomLink }; // Include zoomLink

    // Save the new event
    const event = await Event.create(newEvent);
    return res.status(201).json(event);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({});
    return res.status(200).json({ count: events.length, data: events });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to get event by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to update an event by ID with image upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, category, date, time, description, zoomLink } = req.body; // Include zoomLink
    const image = req.file ? `/uploads/${req.file.filename}` : ''; // Image path handling
    const { id } = req.params;

    // Validate fields
    if (!title || !category || !date || !time || !description || !zoomLink) {
      return res.status(400).json({ message: 'Please provide title, category, date, time, description, and zoomLink' });
    }

    const formattedDate = convertToISODate(date);

    // Update event data including image
    const updateData = { title, category, date: formattedDate, time, description, zoomLink }; // Include zoomLink
    if (image) updateData.image = image;

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete an event by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
