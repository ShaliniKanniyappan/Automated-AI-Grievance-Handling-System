import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        🏛️ Grievance Handling System
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Submit your complaints and track their status seamlessly.
      </p>
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          ✍️ Register a Complaint
        </Link>
        <Link
          to="/status"
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          📊 Check Status
        </Link>
      </div>
    </div>
  );
};

export default Home;
