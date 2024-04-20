import React from 'react';
import { IconDelete, IconEdit } from '@/icons';
import Link from 'next/link';
import { useDarkMode } from '@/state/DarkModeProvider';

const LevelCard = ({ item, handleDeleteConfirmation }) => {
  const { darkMode } = useDarkMode();
  return (
    <div key={item.id} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-4'>

        <div className={`relative w-full h-64 overflow-hidden rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <div className="flex justify-center items-center h-full">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-600'}`}>{item.title}</h2>
            </div>
            <div className={`absolute top-0 left-0 p-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700'} text-xl font-bold rounded-br-lg`}>
                $ {item.price}
            </div>
        </div>

        <div className={`p-4 mt-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <div className="flex mt-2">
                <Link href={`/admin/h/levels/edit/${item.id}`}>
                    <button className={`px-3 py-1 rounded-full mr-2 ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-300'}`}>
                        <IconEdit className={`h-7 w-7`} title='Edit Level' />
                    </button>
                </Link>
                <button onClick={() => handleDeleteConfirmation(item)} className={`px-3 py-1 rounded-full mr-2 ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-300'}`}>
                    <IconDelete className={`h-7 w-7`} title='Delete Level' />
                </button>
            </div>
        </div>

    </div>
  );
};

export default LevelCard;