import API from "../api/axios.config";

const studentService = {
  getStudentById: async (id) => {
    try {
      const response = await API.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching student:", error);
      throw error;
    }
  },
  enrollStudentInCourse: async (studentId, courseId) => {
    try {
      const response = await API.post(`/students/${studentId}/enroll/${courseId}`);
      return response.data;
    } catch (error) {
      console.error("Error enrolling student:", error);
      throw error;
    }
  },

  acceptRejectCourseEnrollment: async (studentId, courseId, status) => {

    try {
      const response = await API.post(`/students/${studentId}/approval/${courseId}`, { status });
      return response.data;
    } catch (error) {
      console.error("Error accepting enrollment:", error);
      throw error;
    }
  },

  createStudent: async (studentData) => {
    try {
      const response = await API.post('/students', studentData);
      return response.data;
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  },
};

export default studentService;