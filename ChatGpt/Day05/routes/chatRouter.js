import express from 'express'
import authUserMiddleware from '../middlewares/authUserMiddleware.js';
import { CreateChat, deleteChat, getRecentChat, getSingleChat } from '../controllers/chatController.js';


const chatRouter=express.Router();

chatRouter.use(authUserMiddleware);

//getRecentChats:  top 20, getSingleChat, createChat , deleteChat
chatRouter.post("/createChat",CreateChat);
chatRouter.get("/getRecentChat",getRecentChat);
chatRouter.get(":chatId",getSingleChat);
chatRouter.delete(":chatId",deleteChat);

export default chatRouter;