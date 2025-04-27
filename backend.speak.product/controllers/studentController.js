const studentModel = require('../models/studentModel');
const courseModel = require('../models/courseModel'); // Import courseModel
const { sendEnrollmentEmail } = require('../utils/email');

const studentController = {
  async getStudentById(req, res) {
    const { id } = req.params;
    
    try {
      const student = await studentModel.getStudentById(id);
      
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      
      res.json(student);
    } catch (error) {
      console.error(`Error fetching student ${id}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createStudent(req, res) {
    try {
      const studentData = req.body;
      const newStudent = await studentModel.createStudent(studentData);
      res.status(201).json(newStudent);
    } catch (err) {
      console.error('createStudent error:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async enrollStudentInCourse(req, res) {
    const { studentId, courseId } = req.params;
    console.log(req, "rajan naam")
    const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
    
    try {
      console.log('Attempting to enroll student:', studentId, 'in course:', courseId);
      const enrollment = await studentModel.enrollStudentInCourse(studentId, courseId);


      if (!enrollment) {
        console.log('Enrollment failed or student already enrolled.');
        return res.status(400).json({ error: 'Student is already enrolled in this course' });
      }

      // Fetch student and course details
      const student = await studentModel.getStudentById(studentId);
      const course = await courseModel.getCourseById(courseId);

      if (!student) {
          return res.status(404).json({ error: 'Student not found after enrollment' });
      }
      if (!course) {
          return res.status(404).json({ error: 'Course not found after enrollment' });
      }

      const studentName = student.first_name + ' ' + student.last_name || 'Unknown Student';
      const primaryParent = student.parents.find(parent => parent.is_primary_contact);
      const parentEmail = 'mail.rajanydv@gmail.com'; // Use primary parent's email if available, otherwise use hardcoded
      const parentName = primaryParent ? primaryParent.first_name + ' ' + primaryParent.last_name : 'Parent'; // Use primary parent's name if available, otherwise use generic "Parent"
      const courseName = course.name || 'Unknown Course';

      console.log( studentId, courseId, "le dono")
      console.log('Primary parent email:', parentEmail);
      console.log('Primary parent name:', parentName);


      // Construct frontend URL
      const frontendUrl = `${FRONTEND_BASE_URL}/approval/${courseId}`;

      console.log(frontendUrl, studentId, courseId, parentEmail)

      // Send email to parent with the URL
      if (parentEmail) {
        console.log('Entering email sending logic. Parent email:', parentEmail);
        await sendEnrollmentEmail(parentEmail, studentName, courseName, frontendUrl, parentName); // Pass studentName, courseName, and parentName
      } else {
        console.warn(`No primary parent email found for student ${studentId}. Email not sent.`);
      }

      res.status(201).json(enrollment);
    } catch (error) {
      console.error(`Error enrolling student ${studentId} in course ${courseId}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async acceptRejectCourseEnrollment(req, res) {
    const { studentId, courseId } = req.params;
    const { status: frontendStatus } = req.body; // Rename status to avoid conflict

    let newStatus;
    if (frontendStatus === 'accepted') {
      newStatus = 'Enrolled';
    } else if (frontendStatus === 'rejected') {
      newStatus = 'Enroll Rejected';
    } else {
      return res.status(400).json({ error: 'Invalid status provided. Must be "accepted" or "rejected".' });
    }

    try {
      const updatedCount = await studentModel.updateEnrollmentStatus(studentId, courseId, newStatus);

      if (updatedCount === 0) {
        return res.status(404).json({ error: 'Enrollment not found for this student and course.' });
      }

      res.status(200).json({ message: `Enrollment status updated to ${newStatus} successfully.` });
    } catch (error) {
      console.error(`Error updating enrollment status for student ${studentId} in course ${courseId}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

};

module.exports = studentController;