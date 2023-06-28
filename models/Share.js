import { Schema, model, models } from "mongoose";

const ShareSchema = new Schema({
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

const Share = models.Share || model("Share", ShareSchema);
export default Share;
