import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Job = () => {
 const navigate = useNavigate();
  const jobId = "12345"; // Example job ID, replace with actual logic to get job ID
  return (
    <div className="max-w-full p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 space-y-4">
      
      {/* Avatar + Company Info */}
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Company Logo" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    
        <div>
          <h1 className="text-lg font-semibold text-gray-800 transition-colors hover:text-blue-600">
            Company Name
          </h1>
          <p className="text-sm text-gray-500">Bangladesh</p>
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h2 className="text-md font-semibold text-gray-700 transition-colors hover:text-blue-500">
          Frontend Developer
        </h2>
        <p className="text-sm text-gray-600">
          Join our dynamic team to build beautiful UIs with React and Tailwind. Remote work available.
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant="secondary"
          className="text-blue-600 bg-blue-100 hover:bg-blue-200 transition-all duration-200"
        >
          Remote
        </Badge>
        <Badge
          variant="secondary"
          className="text-green-600 bg-green-100 hover:bg-green-200 transition-all duration-200"
        >
          Full-time
        </Badge>
        <Badge
          variant="secondary"
          className="text-purple-600 bg-purple-100 hover:bg-purple-200 transition-all duration-200"
        >
          Junior
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button onClick={() => navigate(`/description/${jobId}`)}
          variant="default"
          className="w-full sm:w-auto min-w-[120px] transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          Details
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto min-w-[120px] transition-all duration-200 hover:border-blue-600 hover:text-blue-600 hover:scale-105 cursor-pointer"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
