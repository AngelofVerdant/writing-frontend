import React from 'react';
import { useDarkMode } from '@/state/DarkModeProvider';

const PhaseSectionSkeleton = ({ number }) => {
  const { darkMode } = useDarkMode();

  return (
    <section className="px-4 py-12 text-center">
      <div className="flex justify-left mb-4">
        <div className='w-1/2 h-5 bg-gray-400 rounded-full'></div>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: number }).map((_, index) => (
            <div key={index} className={`bg-gray-300 shadow-md rounded-xl p-8 animate-pulse ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <div className="h-6 bg-gray-400 mb-2 rounded"></div>
              <div className="h-24 bg-gray-400 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhaseSectionSkeleton;