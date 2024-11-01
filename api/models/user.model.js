import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar:{
      type: String,
      default: "https://i.pinimg.com/236x/95/1e/ac/951eac07e5c786716d2334c405a17003.jpg"
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
