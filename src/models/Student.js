const mongoose = require("mongoose");
const pointsHistorySchema = require("./PointsHistory");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 120,
    },
    className: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 80,
    },
    totalPoints: {
      type: Number,
      default: 0,
      min: 0,
    },
    pointsHistory: {
      type: [pointsHistorySchema],
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", studentSchema);
