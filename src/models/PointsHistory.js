const mongoose = require("mongoose");

const pointsHistorySchema = new mongoose.Schema(
  {
    points: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "Points must be a whole number",
      },
    },
    earnedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  { _id: true },
);

module.exports = pointsHistorySchema;
