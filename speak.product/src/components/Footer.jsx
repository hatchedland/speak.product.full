import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 w-full">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">Queen High School Of Science</p>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <span className="text-sm">In collaboration with Speakhire</span>
        </div>
      </div>
    </footer>
  );
};
