import express from 'express'
import authUserMiddleware from "../middlewares/authUserMiddleware.js"
import {sendMessage,getMessage} from "../controllers/messageController.js"
const messageRouter=express.Router();

messageRouter.use(authUserMiddleware)
//get message,sendMessage

messageRouter.post("/",sendMessage);
messageRouter.get("/:chatId",getMessage);
messageRouter.post("/:chatId",sendMessage);


export default messageRouter; 