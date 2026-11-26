const express = require("express");
const studentsRouter = require("./routes/students");
const schedulesRouter = require("./routes/schedules");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use((req, _res, next) => {
  req.body ??= {};
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/students", studentsRouter);
app.use("/api/schedules", schedulesRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

module.exports = app;
