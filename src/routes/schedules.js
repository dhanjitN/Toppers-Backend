const express = require("express");
const ClassSchedule = require("../models/ClassSchedule");

const router = express.Router();

router.post("/", async (req, res) => {
  const schedule = await ClassSchedule.create({
    subject: req.body.subject,
    topic: req.body.topic,
    class: req.body.class,
    startsAt: req.body.startsAt,
  });
  res.status(201).json({ schedule });
});

router.get("/", async (_req, res) => {
  const schedules = await ClassSchedule.find().sort({ startsAt: 1 });
  res.json({ schedules });
});

module.exports = router;
