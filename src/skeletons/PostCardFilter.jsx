import React from 'react';
import { useDarkMode } from '@/state/DarkModeProvider';

const PostCardSkeleton = ({ number }) => {
  const { darkMode } = useDarkMode();

  return (
    <>
      {Array.from({ length: number }).map((_, index) => (
        <div key={index} className={`w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 pt-8 mb-4 animate-pulse ${darkMode ? 'text-white' : 'text-black'}`}>
          <div className={`w-full h-64 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-lg`}></div>
          <div className={`p-4 mt-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-lg`}>
            <div className='h-6 bg-gray-400 mb-2 rounded'></div>
            <div className='flex mt-2'>
              <div className='w-1/3 h-8 bg-gray-400 rounded-full mr-2'></div>
              <div className='w-1/3 h-8 bg-gray-400 rounded-full mr-2'></div>
              <div className='w-1/3 h-8 bg-gray-400 rounded-full'></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostCardSkeleton;