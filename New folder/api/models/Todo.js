const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nest: [
    {
      age: {
        type: Number,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
  ],
  image: {
    type: String,
  },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
