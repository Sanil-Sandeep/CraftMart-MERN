import express from "express";
import { Record } from "../models/returnModel.js";
import { cloudinaryFileUploader } from "../Middlewares/FileUplaoder.js";  // Ensure the correct path

const router = express.Router();

// Route for saving a new return record
router.post("/", cloudinaryFileUploader.single("uploadImage"), async (request, response) => {
  try {
    if (!request.body.pid || !request.body.productName || !request.body.description || !request.file) {
      return response.status(400).send({
        message: "Please send all required fields: pid, name, description, image",
      });
    }

    const newRecords = {
      pid: request.body.pid,
      productName: request.body.productName,
      description: request.body.description,
      uploadImage: request.file.path, // Cloudinary file URL
    };

    const savedRecords = await Record.create(newRecords);

    return response.status(201).send(savedRecords);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Other routes (GET, PUT, DELETE) remain the same
// Route for getting all records
router.get("/", async (request, response) => {
  try {
    const records = await Record.find({});
    return response.status(200).json({
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting one record by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const record = await Record.findById(id);
    return response.status(200).json(record);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a record
router.put("/:id", cloudinaryFileUploader.single("uploadImage"), async (request, response) => {
  try {
    if (!request.body.pid || !request.body.productName || !request.body.description) {
      return response.status(400).send({
        message: "Please send all required fields: pid, name, description",
      });
    }

    const { id } = request.params;
    const updatedData = {
      pid: request.body.pid,
      productName: request.body.productName,
      description: request.body.description,
    };

    // Check if a new file is uploaded and update the uploadImage field
    if (request.file) {
      updatedData.uploadImage = request.file.path; // Cloudinary file URL
    }

    const updatedRecord = await Record.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedRecord) {
      return response.status(404).json({ message: "Record not found" });
    }

    return response.status(200).json({
      message: "Record updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a record
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deletedRecord = await Record.findByIdAndDelete(id);

    if (!deletedRecord) {
      return response.status(404).json({ message: "Record not found" });
    }

    return response.status(200).json({
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
