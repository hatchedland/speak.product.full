import React from "react";

// icons
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { RxAvatar } from "react-icons/rx";


const StickyApprovalBar = ({ childName, parentName, handleAcceptRejectCourseEnrollment, actionLoading, }) => {
  return (
    <div className="px-24 mx-auto fixed top-18 left-0 right-0 z-50 py-4 px-6 flex justify-between items-center bg-white rounded-md">
      <div className="flex gap-2 items-center">
        <RxAvatar size={30} />
        {`${parentName}, your consent is required for ${childName} to enroll in this course.`}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => handleAcceptRejectCourseEnrollment("accepted")}
          disabled={actionLoading}
          className={`font-semibold px-8 py-3 rounded shadow transition flex items-center ${
            actionLoading
              ? "bg-[#D9BF8D]"
              : "bg-[#D9BF8D]"
          }`}
        >
          {actionLoading ? "Processing..." : "Approve"}
          {!actionLoading && <FaCheck className="ml-2" size={20} />}
        </button>
        <button
          onClick={() => handleAcceptRejectCourseEnrollment("rejected")}
          disabled={actionLoading}
          className={`font-semibold px-8 py-3 rounded shadow transition flex items-center ${
            actionLoading
              ? "border-[#D9BF8D]"
              : "border-[#D9BF8D]"
          } border`}
        >
          {actionLoading ? "Processing..." : "Reject"}
          {!actionLoading && <RxCross2 className="ml-2" size={20} />}
        </button>
      </div>
    </div>
  );
};

export default StickyApprovalBar;