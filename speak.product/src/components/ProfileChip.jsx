import React from "react";
import { ClipLoader } from "react-spinners";

import { RxAvatar } from "react-icons/rx";
import { MdErrorOutline } from "react-icons/md";

const ProfileChip = ({ 
  loading, 
  error, 
  data,
  userType = "User"
}) => {
  if (loading) {
    return <ClipLoader color="#17294D" size={50} />;
  }
  
  if (error) {
    return (
      <div className="flex items-center gap-3 p-2 border border-red-500 rounded-md">
        <MdErrorOutline className="text-red-500" size={24} />
        <span className="font-medium text-red-500">Error loading data</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center gap-3 p-2 border border-gray-400 rounded-md">
        <RxAvatar className="text-gray-500" size={24} />
        <span className="font-medium text-gray-600">No data available</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-3">
      <RxAvatar className="mr-1" size={30} />
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">
          {data.first_name} {data.last_name}
        </span>
        <span className="text-sm text-gray-500">{userType}</span>
      </div>
    </div>
  );
};

export default ProfileChip;