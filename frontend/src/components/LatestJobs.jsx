import React from 'react';
import LatestJobCards from './LatestJobCards';

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  return (
    <div className="p-6 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Latest and Top</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {randomJobs.slice(0,8).map((job, index) => (
          <LatestJobCards />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
