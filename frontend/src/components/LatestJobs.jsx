import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const allJobs = useSelector(store => store?.job?.allJobs || []); 

  return (
    
    <div className="p-6 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Latest and Top</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allJobs.length === 0 ? (
          <span>No Jobs Available</span>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
            
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
