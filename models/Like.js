import { Schema, model, models } from "mongoose";

const LikeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  created_at: {
    type: Date,
  },
});

const Like = models.Like || model("Like", LikeSchema);
export default Like;
