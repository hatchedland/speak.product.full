import React, { useState } from 'react';
import studentService from '../services/student.service';
import Layout from '../layout/Layout';
import { toast } from 'react-toastify';

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    school_id: '',
    grade_level: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...studentData,
        school_id: studentData.school_id ? parseInt(studentData.school_id, 10) : null,
      };
      await studentService.createStudent(dataToSend);
      toast.success('Student added successfully!');
      setStudentData({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        email: '',
        phone: '',
        address: '',
        school_id: '',
        grade_level: '',
      });
    } catch (error) {
      toast.error('Error adding student:');
      console.error('Error adding student:', error);
    }
  };

  return (
    <Layout>
 <div className="container mx-auto p-4 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={studentData.first_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={studentData.last_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth:</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={studentData.date_of_birth}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={studentData.gender}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={studentData.phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
          <textarea
            id="address"
            name="address"
            value={studentData.address}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="school_id" className="block text-sm font-medium text-gray-700">School ID:</label>
          <input
            type="number"
            id="school_id"
            name="school_id"
            value={studentData.school_id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="grade_level" className="block text-sm font-medium text-gray-700">Grade Level:</label>
          <input
            type="text"
            id="grade_level"
            name="grade_level"
            value={studentData.grade_level}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#17294D] focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Add Student
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default AddStudent;