import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';

const CourseStatusBanner = ({ message, status }) => {
  // Define styling based on status
  const getBannerClasses = () => {
    switch(status) {
      case 'Accepted':
        return 'bg-amber-950 text-amber-100 border-amber-800';
      case 'Rejected':
        return 'bg-red-900 text-red-100 border-red-800';
      default:
        return 'bg-yellow-600 text-yellow-50 border-yellow-500';
    }
  };

  // Define icon based on status
  const getIcon = () => {
    switch(status) {
      case 'Accepted':
        return <FaCheckCircle className="mr-3 flex-shrink-0" size={24} />;
      case 'Rejected':
        return <FaTimesCircle className="mr-3 flex-shrink-0" size={24} />;
      default:
        return <FaExclamationCircle className="mr-3 flex-shrink-0" size={24} />;
    }
  };

  return (
    <div className={`container mx-auto p-4 rounded-md border ${getBannerClasses()}`}>
              <div className="flex items-center mx-auto">
        {getIcon()}
        <div>
          <span className="font-medium text-base">{message}</span>
          <p className="text-sm mt-1 opacity-90">Additional details can be found in your dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default CourseStatusBanner;