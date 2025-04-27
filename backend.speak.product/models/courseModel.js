const db = require('../db');

const courseModel = {

  async getCourseById(courseId) {
    const courseQuery = `
      SELECT c.*
      FROM courses c
      WHERE c.course_id = $1
    `;
    const courseResult = await db.query(courseQuery, [courseId]);
    
    if (courseResult.rows.length === 0) {
      return null;
    }

    const course = courseResult.rows[0];

    // Get enrolled students
    const studentsQuery = `
      SELECT s.*, e.grade, e.status, e.enrollment_date
      FROM students s
      JOIN enrollments e ON s.student_id = e.student_id
      WHERE e.course_id = $1
    `;
    const studentsResult = await db.query(studentsQuery, [courseId]);
    course.students = studentsResult.rows;

    return course;
  },

};

module.exports = courseModel;