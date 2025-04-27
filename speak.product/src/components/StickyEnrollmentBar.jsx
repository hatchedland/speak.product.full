import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const StickyEnrollmentBar = ({ isSticky, handleEnroll, enrollLoading, enrollSuccess, student, course }) => {
  return (
    <>
      {isSticky && (
        <div className="container mx-auto fixed top-18 left-0 right-0 z-50 bg-[#17294D] shadow-md py-4 px-6 flex justify-between items-center rounded-md">
          <div className="text-white">
            If you want to enroll in this course, you'll need your parents' consent.
          </div>
          <button
            onClick={handleEnroll}
            disabled={enrollLoading || enrollSuccess || !student || !course}
            className={`font-semibold px-8 py-3 rounded shadow transition flex items-center ${
              enrollLoading || enrollSuccess || !student || !course
                ? "bg-[#D9BF8D]"
                : "bg-[#D9BF8D] hover:bg-[#003366]"
            } text-white`}
          >
            {enrollLoading
              ? "Enrolling..."
              : enrollSuccess
              ? "Enrolled!"
              : "Request Consent"}
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      )}
    </>
  );
};

export default StickyEnrollmentBar;