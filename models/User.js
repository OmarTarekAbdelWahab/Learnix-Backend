const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
   hasTakenTest: {
    type: Boolean,
    default: false,
  },
  contentType: {
    type: String,
    enum: [
      "video-audio",
      "video-audio-support",
      "image-text",
      "image-text-support"
    ],
    default: null,
  },
  role: {
    type: String,
    enum: ["student", "teacher"],
    default: "student"
  }
});

module.exports = mongoose.model("User", userSchema);
