import React from "react";
import Layout from "../layout/Layout";
import { MdErrorOutline } from "react-icons/md"; // Import an icon

const NotFound = ({ message }) => {
  return (
    <Layout>
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center bg-white text-gray-800 py-16"> {/* Apply white background and dark text color */}
        <MdErrorOutline className="text-9xl text-[#17294D] mb-4" /> {/* Add icon with dark blue color */}
        <h2 className="text-6xl font-extrabold text-[#17294D]">Error</h2> {/* Change 404 to Error */}
        <p className="mt-4 text-2xl font-semibold">{message || "An unexpected error occurred."}</p> {/* Use message prop with fallback */}
        <p className="mt-2 text-gray-600 max-w-md"> {/* Adjust text color for light background */}
          Please try again later or contact support if the issue persists.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4"> {/* Adjust margin */}
          <a
            href="/"
            className="px-8 py-3 bg-[#D9BF8D] text-[#17294D] rounded shadow hover:bg-[#bf9f6b] transition font-semibold" // Button with accent background and dark text
          >
            Go to Homepage
          </a>
          <a
            href="javascript:history.back()"
            className="px-8 py-3 border border-[#D9BF8D] text-[#D9BF8D] rounded hover:bg-[#D9BF8D] hover:text-[#17294D] transition font-semibold" // Button with accent border/text and accent hover background/dark text
          >
            Go Back
          </a>
        </div>
      </main>
    </Layout>
  );
};

export default NotFound;
