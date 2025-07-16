import React from 'react';
import { Badge } from '@/components/ui/badge';

const LatestJobCards = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transform transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl group cursor-pointer overflow-hidden relative border border-transparent hover:border-blue-500">
      {/* Top corner indicator */}
      <div className="absolute top-0 right-0 bg-blue-100 text-blue-600 px-3 py-1 text-xs font-medium rounded-bl-lg opacity-0 group-hover:opacity-100 transition duration-300">
        Featured
      </div>

      {/* Company Name */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition duration-300">
          Company Name
        </h2>
      </div>

      {/* Job Title & Description */}
      <div className="mt-2">
        <h3 className="text-lg font-bold text-blue-600 group-hover:underline underline-offset-4 transition duration-300">
          Job Title
        </h3>
        <p className="text-sm text-gray-600 mt-2 group-hover:text-gray-800 transition duration-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          veritatis et molestiae deserunt recusandae quisquam atque dolores
          dicta obcaecati vel!
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
          12 Positions
        </Badge>
        <Badge className="bg-green-500 text-white hover:bg-green-600 transition-colors duration-300">
          Part Time
        </Badge>
        <Badge className="bg-yellow-400 text-black hover:bg-yellow-500 transition-colors duration-300">
          12 LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
