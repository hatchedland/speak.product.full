import React, { useState } from 'react';
import courseService from '../services/course.service';
import Layout from '../layout/Layout';
import { toast } from 'react-toastify';

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    credits: '',
    learning_outcomes: '', // Will handle as comma-separated string initially
    created_by: '',
    language: 'English', // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...courseData,
        credits: courseData.credits ? parseInt(courseData.credits, 10) : null,
        learning_outcomes: courseData.learning_outcomes.split(',').map(item => item.trim()),
      };
      await courseService.createCourse(dataToSend);
      toast.success('Course added successfully!');
      setCourseData({
        name: '',
        description: '',
        credits: '',
        learning_outcomes: '',
        created_by: '',
        language: 'English',
      });
    } catch (error) {
      toast.error('Error adding course, please retry');
      console.error('Error adding course:', error);
    }
  };

  return (
    <Layout>
 <div className="container mx-auto p-4 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Course Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="credits" className="block text-sm font-medium text-gray-700">Credits:</label>
          <input
            type="number"
            id="credits"
            name="credits"
            value={courseData.credits}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="learning_outcomes" className="block text-sm font-medium text-gray-700">Learning Outcomes (comma-separated):</label>
          <textarea
            id="learning_outcomes"
            name="learning_outcomes"
            value={courseData.learning_outcomes}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="created_by" className="block text-sm font-medium text-gray-700">Created By:</label>
          <input
            type="text"
            id="created_by"
            name="created_by"
            value={courseData.created_by}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language:</label>
          <input
            type="text"
            id="language"
            name="language"
            value={courseData.language}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#17294D] focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Add Course
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default AddCourse;