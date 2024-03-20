import MessageModel from "../model/messageModel.js";
export default {


  // get all chat messages from the database and return the json to frontend 
  getAllChatMessages: async (req, res) => {
    try {
      const allMessages = await MessageModel.find().select("-_id time message userId type");
      res.status(200).json({ data: allMessages, success: true });
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  },


  // delete all chat messages from the db only for specific purpose
  deleteAllChatMessages: async (req, res) => {
    try {
      const deleteAllMessages = await MessageModel.deleteMany();
      res.status(200).json({ message: "deleted" });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
};
