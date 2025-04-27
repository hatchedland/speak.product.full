import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useStudent } from "../context/StudentContext";
import courseService from "../services/course.service";
import studentService from "../services/student.service"; // Import studentService

import Layout from "../layout/Layout";
import NotFound from "./404NotFound";
import CourseContent from "../components/CourseContent";
import CourseCard from "../components/CourseCard";
import StickyApprovalBar from "../components/StickyApprovalBar";

import CourseStatusBanner from "../components/CourseStatusBanner";
import { toast } from "react-toastify";

const Approval = () => {
  const { id: slugId } = useParams();

  const {
    student,
    loading: loadingStudent,
    error: errorStudent,
  } = useStudent();

  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [errorCourse, setErrorCourse] = useState(null);

  const [actionLoading, setActionLoading] = useState(false); // State for action loading
  const [actionSuccess, setActionSuccess] = useState(false); // State for action success

  // Create refs for each section
  const descriptionRef = useRef(null);
  const whatYoullLearnRef = useRef(null);
  const aboutSpeakHireRef = useRef(null);

  // Scroll to section function
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const [isSticky, setIsSticky] = useState(false);

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

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseById(slugId);
        console.log(data);
        setCourse(data);
      } catch (error) {
        setErrorCourse(error);
      } finally {
        setLoadingCourse(false);
      }
    };

    if (slugId) {
      fetchCourse();
    }
  }, [slugId]);


  if (loadingStudent || loadingCourse) {
    return <Layout loading={loadingStudent || loadingCourse}></Layout>;
  }

  if (errorStudent) {
    console.error("Error loading student:", errorStudent);
    return <NotFound message={`Error loading student: ${errorStudent.message}`} />;
  }

  if (errorCourse) {
    console.error("Error loading course:", errorCourse);
    return <NotFound message={`Error loading course: ${errorCourse.message}`} />;
  }

  if (!student || !course) {
    return <NotFound message="Student or course data not found." />;
  }

  const childName = student.first_name; // Assuming firstname and lastname
  const parentName = student.parents[0].first_name; // Assuming parentname exists on student object
  const courseName = course.title;

  const handleAcceptRejectCourseEnrollment = async ( status ) => {
    setActionLoading(true);
    setActionSuccess(false);
    try {

      await studentService.acceptRejectCourseEnrollment(student.student_id, course.course_id, status);
      setActionSuccess(true);
      navigate('/approved')
    } catch (error) {
      toast.error(`Failed to ${status} enrollment.`)
      console.error("Accept enrollment error:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const studentCourseStatus = student?.courses?.find(
    (studentCourse) => studentCourse.course_id === course?.course_id
  )?.status;

  const showStatusBanner = studentCourseStatus === "Enrolled" || studentCourseStatus === "Enroll Rejected";

  const bannerMessage = studentCourseStatus === "Enrolled"
    ? "Enrollment accepted successfully."
    : "Enrollment Rejected.";

  const bannerStatus = actionSuccess ? "Enrolled" : "Enroll Rejected";


  return (
    <Layout>
      {showStatusBanner ? (
        <CourseStatusBanner message={bannerMessage} status={bannerStatus} />
      ) : (
        <StickyApprovalBar
          childName={childName}
          parentName={parentName}
          courseName={courseName}
          handleAcceptRejectCourseEnrollment={handleAcceptRejectCourseEnrollment}
          actionLoading={actionLoading}
        />
      )}

      <div className="container mt-12 mx-auto p-[48px] bg-[#17294D] text-white rounded-lg">
        <CourseCard course={course} />
      </div>

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

export default Approval;
