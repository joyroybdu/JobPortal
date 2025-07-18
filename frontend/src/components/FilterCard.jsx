import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Development", "Backend Development", "Full Stack Development", "Data Science", "Design"]
  },
  {
    filterType: "Salary Range",
    array: ["Below 30k", "30k - 50k", "50k - 70k", "70k - 100k", "Above 100k"]
  }
];

const FilterCard = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-6 max-h-[60vh] overflow-auto">
      <h1 className="text-2xl font-bold text-gray-800">Filter Card</h1>

      <RadioGroup className="space-y-6">
        {filterData.map((section, index) => (
          <div key={index} className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700">{section.filterType}</h2>
            {section.array.map((option, i) => (
              <div key={i} className="flex items-center space-x-2 cursor-pointer">
           
                <RadioGroupItem
                  value={option}
                  id={`${section.filterType}-${option}`}
                />
                <label
                  htmlFor={`${section.filterType}-${option}`}
                  className="text-sm text-gray-600 cursor-pointer"
                >
                 
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
