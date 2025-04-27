// controllers/courseController.js
const pool = require('../db');

exports.createCourse = async (req, res) => {
  const { title, description, duration } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO public.courses (title, description, duration)
       VALUES ($1, $2, $3)
       RETURNING *;`,
      [title, description, duration]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("createCourse error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT * FROM public.courses WHERE course_id = $1;`,
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: "Course not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("getCourseById error:", err);
    res.status(500).json({ error: err.message });
  }
};
