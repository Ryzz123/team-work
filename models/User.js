import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  profesi: {
    type: String,
    default: "-",
  },
  role: {
    type: String,
    default: "user",
  },
  bio: {
    type: String,
    default: "-",
  },
  website: {
    type: String,
    default: null,
  },
  instagram: {
    type: String,
    default: null,
  },
  github: {
    type: String,
    default: null,
  }
});

const User = models.User || model("User", UserSchema);
export default User;
