import React from "react";
import { useStudent } from "../context/StudentContext";
import { useLocation } from "react-router";
import ProfileChip from "./ProfileChip";

const Navbar = () => {
  const { student, loading, error } = useStudent();
  const location = useLocation();
  
  const isApprovalPage = location.pathname.includes('approval');

  return (
    <nav className="sticky top-0 z-50 bg-white w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side - Logos and school name */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-3">
            <img
              src="/queens_logo.png"
              alt="Queen's logo"
              className="w-12 h-12"
            />
            <h1 className="text-xl font-semibold text-gray-800">
              Queen High School Of Science
            </h1>
            <span className="text-gray-400 mx-2">|</span>
            <img
              src="/speakhire_logo.png"
              alt="SpeakHire's logo"
              className="w-24"
            />
          </div>
        </div>

        {/* Right side - Profile information */}
        <div className="flex items-center">
          {isApprovalPage && student?.parents?.length > 0 ? (
            <ProfileChip
              loading={loading}
              error={error}
              data={student?.parents[0]}
              userType="Parent"
            />
          ) : (
            <ProfileChip
              loading={loading}
              error={error}
              data={student}
              userType="Student"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;