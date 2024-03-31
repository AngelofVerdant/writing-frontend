import React from 'react';
import { useDarkMode } from '@/state/DarkModeProvider';

const AchievementSectionSkeleton = ({ number }) => {
  const { darkMode } = useDarkMode();

  return (
    <section className="relative bg-cover bg-center py-20">
        <div className="container mx-auto text-center">
            <div className="mb-12">
              <div className="flex justify-center mb-4">
                <div className='w-1/2 h-5 bg-gray-400 rounded-full'></div>
              </div>
              <div className="flex justify-left mb-4">
                <div className='w-full h-5 bg-gray-400 rounded-full'></div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: number }).map((_, index) => (
                <div key={index} className={`p-8 ${index % 2 === 0 ? 'bg-gray-200 bg-opacity-25' : 'bg-white bg-opacity-25'} rounded-lg animate-pulse ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  <div className="flex justify-center mb-4 opacity-75">
                    <div className='w-5 h-5 bg-gray-400 rounded-full'></div>
                  </div>
                  <div className="flex justify-center mb-4 opacity-75">
                    <div className='w-5 h-5 bg-gray-400 rounded-full'></div>
                  </div>
                </div>
            ))}
            </div>
        </div>
    </section>
  );
};

export default AchievementSectionSkeleton;