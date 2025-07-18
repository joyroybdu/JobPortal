import React from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Filter Section (Top on mobile, sidebar on desktop) */}
          <div className="w-full md:w-1/3 lg:w-1/4 px-2 md:px-0">
            <FilterCard />
          </div>

          {/* Job Listings Section */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            {jobsArray.length === 0 ? (
              <div className="flex items-center justify-center h-96">
                <h1 className="text-2xl font-bold text-gray-500">No Jobs Found</h1>
              </div>
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {jobsArray.map((item, index) => (
                  <Job key={index} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;
