import React from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const Browse = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Search Result ({randomJobs.length})
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {randomJobs.map((job, index) => {
            return (
              <div key={index}>
                <Job />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
