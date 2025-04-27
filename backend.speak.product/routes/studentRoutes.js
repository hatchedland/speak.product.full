const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

router.post('/', studentController.createStudent);

router.get('/:id', studentController.getStudentById);

router.post('/:studentId/enroll/:courseId', studentController.enrollStudentInCourse);

router.post('/:studentId/approval/:courseId', studentController.acceptRejectCourseEnrollment);

module.exports = router;