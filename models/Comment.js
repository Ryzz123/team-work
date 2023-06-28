import { Schema, models, model } from "mongoose";

const CommentSChema = new Schema({
  creator: {
    type: String,
    ref: "User",
  },
  post: {
    type: String,
    ref: "Post",
  },
  comment: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
  },
});

const Comment = models.Comment || model("Comment", CommentSChema);
export default Comment;