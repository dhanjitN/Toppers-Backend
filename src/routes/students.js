const express = require("express");
const Student = require("../models/Student");
const { getUtcDayRange } = require("../utils/date");

const router = express.Router();

router.post("/", async (req, res) => {
  const student = await Student.create({
    name: req.body.name,
    className: req.body.className,
  });
  res.status(201).json({ student });
});

router.get("/", async (_req, res) => {
  const students = await Student.find().sort({ name: 1 });
  res.json({ students });
});

router.get("/:studentId/points", async (req, res) => {
  const range = getUtcDayRange(req.query.date);
  if (!range) {
    return res.status(400).json({
      error: "A valid UTC date is required in YYYY-MM-DD format",
    });
  }

  const student = await Student.findById(req.params.studentId).select(
    "name pointsHistory",
  );
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const entries = student.pointsHistory.filter(
    (entry) => entry.earnedAt >= range.start && entry.earnedAt < range.end,
  );
  const totalPoints = entries.reduce((total, entry) => total + entry.points, 0);

  res.json({
    studentId: student.id,
    studentName: student.name,
    date: req.query.date,
    totalPoints,
    entries,
  });
});

router.post("/:studentId/points", async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  student.pointsHistory.push({
    points: req.body.points,
    earnedAt: req.body.earnedAt,
    note: req.body.note,
  });
  student.totalPoints += student.pointsHistory[student.pointsHistory.length - 1].points;
  await student.save();

  res.status(201).json({ student });
});

router.get("/:studentId", async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json({ student });
});

router.patch("/:studentId", async (req, res) => {
  const updates = {};
  if (req.body.name !== undefined) updates.name = req.body.name;
  if (req.body.className !== undefined) updates.className = req.body.className;

  const student = await Student.findByIdAndUpdate(req.params.studentId, updates, {
    new: true,
    runValidators: true,
  });
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json({ student });
});

router.delete("/:studentId", async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.studentId);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.status(204).end();
});

module.exports = router;
