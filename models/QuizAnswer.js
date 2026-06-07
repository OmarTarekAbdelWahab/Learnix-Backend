const mongoose = require("mongoose");

const quizAnswerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  moduleId: {
    type: String,
    required: true,
  },

  quizIndex: {
    type: Number,
    required: true,
  },

  selectedChoice: {
    type: String,
    required: true,
  },

  isCorrect: {
    type: Boolean,
    required: true,
  },

  contentType: {
    type: String,
    enum: [
      "video-audio",
      "video-audio-support",
      "image-text",
      "image-text-support"
    ],
    required: true,
  }

}, { timestamps: true });


/// 🔥 VERY IMPORTANT: prevent duplicates
quizAnswerSchema.index(
  { userId: 1, moduleId: 1, quizIndex: 1 },
  { unique: true }
);

module.exports = mongoose.model("QuizAnswer", quizAnswerSchema);
