import express from 'express';
import { MChat } from '../models/mChatModel.js';

const router = express.Router();

//Route for create a new message
router.post("/", async (request, response) => {
  try {
    if (!request.body.mMessage) {
      return response.status(400).send({
        message: "Send all required fields: message",
      });
    }
    const newMChat = {
      mMessage: request.body.mMessage,
    };

    const mchat = await MChat.create(newMChat);

    return response.status(201).send(mchat);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for get all messages from database
router.get("/", async (request, response) => {
  try {
    const mchats = await MChat.find({});

    return response.status(200).json({
      count: mchats.length,
      data: mchats,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for get one messages from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const mchat = await MChat.findById(id);

    return response.status(200).json(mchat);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for update message
router.put("/:id", async (request, response) => {
  try {
    if (!request.body.mMessage) {
      return response.status(400).send({
        message: "Send all required fields: message",
      });
    }

    const { id } = request.params;

    const result = await MChat.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Feedback not found" });
    }
    return response
      .status(200)
      .send({ message: "Feedback updated succesfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for reply message
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.mMessage ||
      !request.body.mReply
    ) {
      return response.status(400).send({
        message: "Send all required fields: message",
      });
    }

    const { id } = request.params;

    const result = await MChat.findByIdAndReply(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "message not found" });
    }
    return response
      .status(200)
      .send({ message: "Reply added successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for delete a message
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await MChat.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Message not found" });
    }
    return response
      .status(200)
      .send({ message: "Message deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;