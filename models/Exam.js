const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // 🔥 ensures one exam per user
  },

  score: {
    type: Number,
    required: true,
  }

}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);
