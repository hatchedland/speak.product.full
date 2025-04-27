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
  const id = 4; // This should come from params or props
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseById(id);
        setCourse(data);
      } catch (error) {
        toast.error("Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

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
    (studentCourse) => studentCourse.course_id === course?.course_id
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
