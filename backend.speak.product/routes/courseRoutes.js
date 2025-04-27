const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// create one course
router.post('/', courseController.createCourse);

// (optionally) get course by ID
router.get('/:id', courseController.getCourseById);

module.exports = router;
