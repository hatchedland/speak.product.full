const db = require('../db');

const studentModel = {
  // Get all students
  async getAllStudents() {
    const query = `
      SELECT s.*, sc.name as school_name 
      FROM students s
      LEFT JOIN schools sc ON s.school_id = sc.school_id
    `;
    const { rows } = await db.query(query);
    return rows;
  },

  // Get student by ID with related data
  async getStudentById(studentId) {
    // Get student info
    const studentQuery = `
      SELECT s.*, sc.name as school_name 
      FROM students s
      LEFT JOIN schools sc ON s.school_id = sc.school_id
      WHERE s.student_id = $1
    `;
    const studentResult = await db.query(studentQuery, [studentId]);
    
    if (studentResult.rows.length === 0) {
      return null;
    }

    const student = studentResult.rows[0];

    // Get student's parents
    const parentsQuery = `
      SELECT p.*, sp.relationship_type, sp.is_primary_contact
      FROM parents p
      JOIN student_parent sp ON p.parent_id = sp.parent_id
      WHERE sp.student_id = $1
    `;
    const parentsResult = await db.query(parentsQuery, [studentId]);
    student.parents = parentsResult.rows;

    // Get student's courses
    const coursesQuery = `
      SELECT c.*, e.grade, e.status, e.enrollment_date
      FROM courses c
      JOIN enrollments e ON c.course_id = e.course_id
      WHERE e.student_id = $1
    `;
    const coursesResult = await db.query(coursesQuery, [studentId]);
    student.courses = coursesResult.rows;

    return student;
  },

  // Create a new student
  async createStudent(studentData) {
    const query = `
      INSERT INTO students (
        first_name, last_name, date_of_birth, gender, 
        email, phone, address, school_id, grade_level
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [
      studentData.first_name,
      studentData.last_name,
      studentData.date_of_birth,
      studentData.gender,
      studentData.email,
      studentData.phone,
      studentData.address,
      studentData.school_id,
      studentData.grade_level
    ];

    const { rows } = await db.query(query, values);
    return rows[0];
  },

  // Update a student
  async updateStudent(studentId, studentData) {
    const query = `
      UPDATE students
      SET first_name = $1, 
          last_name = $2, 
          date_of_birth = $3, 
          gender = $4, 
          email = $5, 
          phone = $6, 
          address = $7, 
          school_id = $8, 
          grade_level = $9,
          updated_at = CURRENT_TIMESTAMP
      WHERE student_id = $10
      RETURNING *
    `;

    const values = [
      studentData.first_name,
      studentData.last_name,
      studentData.date_of_birth,
      studentData.gender,
      studentData.email,
      studentData.phone,
      studentData.address,
      studentData.school_id,
      studentData.grade_level,
      studentId
    ];

    const { rows } = await db.query(query, values);
    return rows[0];
  },

  // Delete a student
  async deleteStudent(studentId) {
    // First delete from related tables
    await db.query('DELETE FROM student_parent WHERE student_id = $1', [studentId]);
    await db.query('DELETE FROM enrollments WHERE student_id = $1', [studentId]);
    
    // Then delete the student
    const query = 'DELETE FROM students WHERE student_id = $1 RETURNING *';
    const { rows } = await db.query(query, [studentId]);
    return rows[0];
  },

  // Enroll student in a course
  async enrollStudentInCourse(studentId, courseId) {
    const query = `
      INSERT INTO enrollments (student_id, course_id, status)
      VALUES ($1, $2, $3)
      ON CONFLICT (student_id, course_id) DO NOTHING
      RETURNING *
    `;
    
    const result = await db.query(query, [studentId, courseId, 'Enroll Requested']);
    console.log('Enrollment query result - rows:', result.rows, 'rowCount:', result.rowCount);
    return result.rows[0];
  },
// Update enrollment status
  async updateEnrollmentStatus(studentId, courseId, status) {
    const query = `
      UPDATE enrollments
      SET status = $3, updated_at = CURRENT_TIMESTAMP
      WHERE student_id = $1 AND course_id = $2
      RETURNING *
    `;
    const { rowCount } = await db.query(query, [studentId, courseId, status]);
    return rowCount;
  },
// Get primary parent's email by student ID
  async getPrimaryParentEmailByStudentId(studentId) {
    const query = `
      SELECT p.email
      FROM parents p
      JOIN student_parent sp ON p.parent_id = sp.parent_id
      WHERE sp.student_id = $1 AND sp.is_primary_contact = TRUE
    `;
    const { rows } = await db.query(query, [studentId]);
    return rows.length > 0 ? rows[0].email : null;
  }

};

module.exports = studentModel;
