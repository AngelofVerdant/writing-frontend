import React from 'react';
import { IconAdd } from '@/icons';
import { useDarkMode } from '@/state/DarkModeProvider';

const AdminOrderCard = ({ item, handleAssignConfirmation }) => {
  const { darkMode } = useDarkMode();
  const isIssueable = item.status.id === 1 && item.payment.id === 2;


  return (
    <div key={item.id} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-4'>

        <div className={`relative w-full h-64 overflow-hidden rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <div className="flex justify-center items-center h-full">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-600'}`}>{item.title}</h2>
            </div>
            <div className={`absolute top-0 left-0 p-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700'} text-xl font-bold rounded-br-lg`}>
                $ {item.price}
            </div>
            <div className={`absolute bottom-0 right-0 p-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700'} text-xl font-bold rounded-br-lg`}>
                {item.status.title}
            </div>
        </div>

        <div className={`p-4 mt-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <div className="flex mt-2">
                {isIssueable && (
                    <button
                        onClick={() => handleAssignConfirmation(item)}
                        className={`flex items-center px-4 py-2 rounded-full text-lg font-bold cursor-pointer ${darkMode ? 'text-white bg-gray-800 hover:bg-gray-600' : 'text-gray-700 bg-gray-300 hover:bg-gray-200'}`}
                    >
                        <IconAdd className="h-7 w-7 mr-2" title="Add Payment" />
                        <span>Assign</span>
                    </button>
                )}
            </div>
        </div>

    </div>
  );
};

export default AdminOrderCard;