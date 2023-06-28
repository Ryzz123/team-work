import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
  },
});

const Post = models.Post || model("Post", PostSchema);
export default Post;
