import React from "react";
import { SlCalender } from "react-icons/sl";
import { IoLanguageSharp } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

const CourseCard = ({ course }) => {
  return (
    <section>
      <div className="container ">
        <div className="container flex justify-between items-center">
          <div className="md:w-2/3">
            <h2 className="text-4xl font-bold mb-3">{course.name}</h2>
            <p className="text-lg mb-6">{course.description}</p>
            <div className="flex items-center mb-2">
              <label className="mr-2">Created by:</label>
              <RxAvatar className="mr-1" />
              <span>{course.created_by}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <SlCalender className="mr-1" />
                <span>{course.created_at}</span>
              </div>
              <div className="flex items-center">
                <IoLanguageSharp className="mr-1" />
                <span>{course.language}</span>
              </div>
            </div>
          </div>
          <div>
            <img src="/course_image.png" alt="Course Image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCard;
