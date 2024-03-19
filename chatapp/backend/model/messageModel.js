import mongoose, { Mongoose } from "mongoose";

const MessageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  type:{
    type: Number,
    required:true
  },
  time:{
    type: String,
    require: true
  },
  message: {
    type: String,
    required: true
  }
}, {timestamps:true});

const MessageModel = mongoose.models?.message || mongoose.model("message", MessageSchema);
export default MessageModel;