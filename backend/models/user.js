import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
   email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  list: [{
    type: mongoose.Types.ObjectId,
    ref: "List",
  }],
});

  const User = mongoose.model("User", userSchema);

  export default User;
