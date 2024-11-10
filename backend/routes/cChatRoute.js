import express from 'express';
import { CChat } from '../models/cChatModel.js';

const router = express.Router();

//Route for create a new message
router.post("/", async (request, response) => {
  try {
    if (!request.body.cMessage) {
      return response.status(400).send({
        message: "Send all required fields: message",
      });
    }
    const newCChat = {
      cMessage: request.body.cMessage,
    };

    const cchat = await CChat.create(newCChat);

    return response.status(201).send(cchat);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for get all messages from database
router.get("/", async (request, response) => {
  try {
    const cchats = await CChat.find({});

    return response.status(200).json({
      count: cchats.length,
      data: cchats,
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

    const cchat = await CChat.findById(id);

    return response.status(200).json(cchat);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for update message
router.put("/:id", async (request, response) => {
  try {
    if (!request.body.cMessage) {
      return response.status(400).send({
        message: "Send all required fields: message",
      });
    }

    const { id } = request.params;

    const result = await CChat.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Message not found" });
    }
    return response
      .status(200)
      .send({ message: "Message updated succesfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for reply message
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.cMessage ||
      !request.body.cReply
    ) {
      return response.status(400).send({
        message: "Send all required fields: message",
      });
    }

    const { id } = request.params;

    const result = await CChat.findByIdAndReply(id, request.body);

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

    const result = await CChat.findByIdAndDelete(id);

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