import React from 'react';
import { IconAdd, IconDownload } from '@/icons';
import { useDarkMode } from '@/state/DarkModeProvider';

const AssignmentCard = ({ item, handleDownload }) => {
  const { darkMode } = useDarkMode();
  return (
    <div key={item.id} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-4'>

        <div className={`relative w-full h-64 overflow-hidden rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <div className="flex justify-center items-center h-full">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-600'}`}>{item.title}</h2>
            </div>
        </div>

        <div className={`p-4 mt-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <div className="flex mt-2">
                {/* <button onClick={() => handleDownload(item)} className={`px-3 py-1 rounded-full mr-2 ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-300'}`}>
                    <IconAdd className={`h-7 w-7`} title='Download Documents' />
                </button> */}
                <button onClick={() => handleDownload(item)} className={`flex items-center px-4 py-2 rounded-full text-lg font-bold mr-2 ${darkMode ? 'text-white bg-gray-800 hover:bg-gray-600' : 'text-gray-700 bg-gray-300 hover:bg-gray-200'}`}>
                    <IconDownload className={`h-7 w-7 mr-2`} title='Download Assignment Documents' />
                    <span>Download</span>
                </button>
            </div>
        </div>

    </div>
  );
};

export default AssignmentCard;