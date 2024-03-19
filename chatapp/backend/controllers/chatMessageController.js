import MessageModel from "../model/messageModel.js";
export default {
  getAllChatMessages: async (req, res) => {
    try {
      const allMessages = await MessageModel.find().select("-_id time message userId type");
      res.status(200).json({ data: allMessages, success: true });
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  },
};
