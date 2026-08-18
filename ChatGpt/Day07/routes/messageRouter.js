import express from "express";
import {
  sendMessage,
  getMessages,
} from "../controllers/messageController.js";

import authMiddleware from "../middlewares/authUserMiddleware.js";

const messageRouter = express.Router();

messageRouter.use(authMiddleware);

messageRouter.post("/", sendMessage);
messageRouter.post("/:chatId", sendMessage);
messageRouter.get("/:chatId", getMessages);

export default messageRouter;