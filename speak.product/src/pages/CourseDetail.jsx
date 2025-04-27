import React, { useState, useEffect, useRef } from "react";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import NotFound from "./404NotFound"; // Import NotFound component

import courseService from "../services/course.service";
import studentService from "../services/student.service";
import { useStudent } from "../context/StudentContext";

// Components
import CourseContent from "../components/CourseContent";
import StickyEnrollmentBar from "../components/StickyEnrollmentBar";
import { ClipLoader } from "react-spinners";
import { FaArrowRight } from "react-icons/fa6";
import CourseCard from "../components/CourseCard";
import CourseStatusBanner from "../components/CourseStatusBanner";

const CourseDetail = () => {
  // Create refs for each section
  const descriptionRef = useRef(null);
  const whatYoullLearnRef = useRef(null);
  const aboutSpeakHireRef = useRef(null);

  // Scroll to section function
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  // State to track scroll position for sticky bar
  const [isSticky, setIsSticky] = useState(false);

  // Add scroll event listener for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      // Set sticky when scrolling past the hero section
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 300); // Adjust this value based on your hero section height
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Course functionality
  const { student } = useStudent();
  const [courseId, setCourseId] = useState(4); // Initial course ID, will come from params or props later
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all courses for the dropdown
        const coursesData = await courseService.getAllCourses();
        setAllCourses(coursesData);

        // Fetch the specific course details based on courseId state
        const courseData = await courseService.getCourseById(courseId);
        setCourse(courseData);
      } catch (error) {
        toast.error("Failed to fetch data.");
        console.error("Fetch data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]); // Rerun effect when courseId changes

  const navigate = useNavigate();

  const handleEnroll = async () => {
    if (student && course) {
      setEnrollLoading(true);
      setEnrollSuccess(null);

      try {
        await studentService.enrollStudentInCourse(
          student.student_id,
          course.course_id
        );
        setEnrollSuccess("Enrollment request sent successfully.");
        navigate("/enrolled");
      } catch (error) {
        toast.error("Failed to send enrollment request.");
        console.error("Enrollment error:", error); // Keep console.error for debugging
      } finally {
        setEnrollLoading(false);
      }
    }
  };

  const studentCourseExists = student?.courses?.find(
    (studentCourse) => studentCourse.course_id === courseId
  );

  if (loading) {
    return <Layout loading={loading} />;
  }

  if (!course) {
    return <NotFound message="Course data not found." />;
  }

  return (
    <Layout>
      {/* Course Status Banner - appears when status is "Enroll Requested" */}
      {studentCourseExists ? (
        <CourseStatusBanner
          message="You've request an Enrollment"
          status={studentCourseExists}
        />
      ) : (
        <StickyEnrollmentBar
          isSticky={isSticky}
          handleEnroll={handleEnroll}
          enrollLoading={enrollLoading}
          enrollSuccess={enrollSuccess}
          student={student}
          course={course}
        />
      )}

      {/* Course ID Dropdown */}
      <div className="container flex gap-4 items-center mx-auto mt-2">
        <label htmlFor="course-select" className="inline text-sm font-medium text-gray-700">
          Select Course:
        </label>
        <select
          id="course-select"
          name="course-select"
          className="block pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={courseId}
          onChange={(e) => setCourseId(parseInt(e.target.value, 10))}
        >
          {allCourses.map((course) => (
            <option key={course.course_id} value={course.course_id}>
              Course ID: {course.course_id}
            </option>
          ))}
        </select>
      </div>


      {/* Hero Section */}
      <div className="container mx-auto mt-2 p-[48px] bg-[#17294D] text-white rounded-lg">
        <CourseCard
          course={course}
          handleEnroll={handleEnroll}
          enrollLoading={enrollLoading}
          enrollSuccess={enrollSuccess}
          student={student}
        />
        {/* handle enrollment */}
        {!studentCourseExists && (
          <div className="flex items-center justify-between mt-6">
            <div>
              If you want to enroll in this course, you'll need your parents'
              consent.
            </div>
            <button
              onClick={handleEnroll}
              disabled={enrollLoading || enrollSuccess || !student || !course}
              className={`mt-4 md:mt-0 font-semibold px-8 py-3 rounded shadow transition flex items-center ${
              enrollLoading || enrollSuccess || !student || !course
                  ? "bg-[#D9BF8D]"
                  : "bg-[#D9BF8D] hover:bg-[#003366]"
              } text-white`}
            >
              {enrollLoading
                ? "Enrolling..."
                : enrollSuccess
                ? "Enrolled!"
                : "Request Consent"}{" "}
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}
      </div>

      {/* Course Content Section */}
      <CourseContent
        course={course}
        descriptionRef={descriptionRef}
        whatYoullLearnRef={whatYoullLearnRef}
        aboutSpeakHireRef={aboutSpeakHireRef}
        scrollToSection={scrollToSection}
      />
    </Layout>
  );
};

export default CourseDetail;
