import React from 'react';
import { IconAdd, IconCheck, IconClose, IconDownload, IconEdit } from '@/icons';
import Link from 'next/link';
import { useDarkMode } from '@/state/DarkModeProvider';

const OrderCard = ({ item, handlePaymentConfirmation }) => {
  const { darkMode } = useDarkMode();
  const isPayable = item.payment === 1;
  const isComplete = item.stageid === 3;
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
                {item.stagetitle}
            </div>
        </div>

        <div className={`p-4 mt-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <div className="flex mt-2">
                <Link href={`/user/o/orders/edit/${item.id}`}>
                    <button className={`px-4 py-2 rounded-full mr-2 ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-300'}`}>
                        <IconEdit className={`h-7 w-7`} title='Edit order' />
                    </button>
                </Link>
                <button onClick={isPayable ? () => handlePaymentConfirmation(item) : undefined} disabled={!isPayable} className={`flex items-center px-4 py-2 rounded-full text-lg font-bold mr-2 ${!isPayable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${darkMode ? 'text-white bg-gray-800 hover:bg-gray-600' : 'text-gray-700 bg-gray-300 hover:bg-gray-200'}`}>
                    {isPayable ? (
                        <>
                            <IconAdd className={`h-7 w-7 mr-2`} title='Add Payment' />
                            <span>Pay</span>
                        </>
                    ) : (
                        <>
                            <IconCheck className={`h-7 w-7 mr-2`} title='Add Payment' />
                            <span>Paid</span>
                        </>
                    )}
                </button>
                <button onClick={isComplete ? () => handlePaymentConfirmation(item) : undefined} disabled={!isComplete} className={`flex items-center px-4 py-2 rounded-full text-lg font-bold ${!isComplete ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${darkMode ? 'text-white bg-gray-800 hover:bg-gray-600' : 'text-gray-700 bg-gray-300 hover:bg-gray-200'}`}>
                    {isComplete ? (
                        <>
                            <IconDownload className={`h-7 w-7 mr-2`} title='Add Payment' />
                            <span>Download</span>
                        </>
                    ) : (
                        <>
                            <IconClose className={`h-7 w-7 mr-2`} title='Add Payment' />
                            <span>Incomplete</span>
                        </>
                    )}
                </button>
            </div>
        </div>

    </div>
  );
};

export default OrderCard;