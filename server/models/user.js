import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: String,
    name: String,
    email: String,
    picture: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
