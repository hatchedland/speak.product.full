const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// create one course
router.post('/', courseController.createCourse);

// (optionally) get course by ID
router.get('/:id', courseController.getCourseById);

// get all courses
router.get('/', courseController.getAllCourses);

module.exports = router;
