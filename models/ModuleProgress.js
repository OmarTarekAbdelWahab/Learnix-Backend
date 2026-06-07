const mongoose = require("mongoose");

const moduleProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  moduleId: {
    type: String,
    required: true,
  },

  currentPart: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ["in-progress", "awaiting-test", "finished"],
    default: "in-progress",
  },

  testResult: {
    type: Number,
    default: null,
  }
});

module.exports = mongoose.model("ModuleProgress", moduleProgressSchema);
