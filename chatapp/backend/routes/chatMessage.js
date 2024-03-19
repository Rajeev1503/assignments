import express from 'express'
import chatMessageController from '../controllers/chatMessageController.js';

const router = express.Router();

router
.get('/getall', chatMessageController.getAllChatMessages)

export default router