import API from "../api/axios.config";

const courseService = {
  getCourseById: async (id) => {
    try {
      const response = await API.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching course:", error);
      throw error;
    }
  },
  createCourse: async (courseData) => {
    try {
      const response = await API.post('/courses', courseData);
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },
};

export default courseService;