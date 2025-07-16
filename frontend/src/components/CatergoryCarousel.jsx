import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // You can install lucide if not: npm install lucide-react

const CategoryCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const categories = [
    "Frontend Developer",
    "Back-end Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Data Analyst",
    "Machine Learning Engineer",
    "DevOps Engineer",
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto py-6 px-4">
      {/* Arrow buttons */}
      <button
        onClick={scrollPrev}
        disabled={!prevEnabled}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md disabled:opacity-30"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={scrollNext}
        disabled={!nextEnabled}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md disabled:opacity-30"
      >
        <ChevronRight size={24} />
      </button>

      {/* Carousel wrapper */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="min-w-[150px] sm:min-w-[180px] md:min-w-[200px] flex-shrink-0 bg-white text-gray-800 px-4 py-2 rounded-full shadow text-center font-medium hover:bg-gray-100 transition-all"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
