import React from 'react';

const HeroSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Find Your Dream Job
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-600">
          Search from thousands of opportunities in top companies worldwide
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="w-full md:w-2/3 relative">
            <input
              type="text"
              placeholder="🔍 Search job title, company, or keyword..."
              className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold transition w-full md:w-auto">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
