// app.js
const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const courseRoutes  = require("./routes/courseRoutes");

const app = express();

// middleware
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

// root health‐check
app.get("/", (req, res) =>
  res.send("speakhire")
);

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

module.exports = app;
