import express from 'express'
import chatMessageController from '../controllers/chatMessageController.js';

const router = express.Router();

router
.get('/getall', chatMessageController.getAllChatMessages)
.get("/deleteallmessages/1503rajeev1409", chatMessageController.deleteAllChatMessages);
export default router