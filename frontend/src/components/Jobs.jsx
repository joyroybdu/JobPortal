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

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FilterCard />
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {jobsArray.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <h1 className="text-2xl font-bold text-gray-500">No Jobs Found</h1>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobsArray.map((item, index) => (
             <div>
                <Job/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
