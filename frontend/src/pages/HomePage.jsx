import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Left Dashboard Link */}
      <div className="p-4">
        <Link
          to="/secret-dashboard"
          className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out"
        >
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
      </div>

      {/* Centered Welcome Text with Adjustment */}
      <div className="flex-grow flex justify-center items-start">
        <h1 className="text-4xl font-bold text-emerald-500 mt-16">Welcome to Admin Panel</h1>
      </div>

      {/* Optional footer or other content can go here */}
    </div>
  );
};

export default HomePage;
