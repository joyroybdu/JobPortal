import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const JobDescription = () => {
  const isApplied = false; // Replace with actual logic to check if the user has applied

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-10 bg-white shadow-lg rounded-3xl">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Frontend Developer</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="ghost" className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">12 Positions</Badge>
          <Badge variant="ghost" className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Part Time</Badge>
          <Badge variant="ghost" className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">12 LPA</Badge>
        </div>
       <Button
  disablbled={isApplied}
  className={`mt-4 px-6 py-2 text-white transition rounded-xl shadow
    ${isApplied 
      ? 'bg-gray-400 cursor-not-allowed'  // Already applied = gray
      : 'bg-blue-600 hover:bg-blue-700 cursor-pointer' // Not applied = blue
    }`}
>
  {isApplied ? 'Already Applied' : 'Apply Now'}
</Button>

      </div>

      {/* Description */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2 text-gray-800">Job Description</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-base">
          <p><strong>Role:</strong> <span className="text-gray-900">Software Engineer</span></p>
          <p><strong>Location:</strong> <span className="text-gray-900">Dhaka</span></p>
          <p><strong>Experience:</strong> <span className="text-gray-900">2 years</span></p>
          <p><strong>Salary:</strong> <span className="text-gray-900">12 LPA</span></p>
          <p><strong>Total Applicants:</strong> <span className="text-gray-900">4</span></p>
          <p><strong>Posted Date:</strong> <span className="text-gray-900">17-07-25</span></p>
        </div>
        <div className="text-gray-800 leading-relaxed text-base">
          <strong>Description:</strong><br />
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, sint?
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
