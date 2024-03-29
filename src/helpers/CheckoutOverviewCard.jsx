import Image from 'next/image';
import { useDarkMode } from '@/state/DarkModeProvider';
import { IconAdd } from '@/icons';

const CheckoutOverviewCard = ({ imageUrl, title, description, buttons, handleClick }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`w-full p-4 pt-0 pb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
      <div className={`p-2 rounded-lg flex flex-col items-center justify-center flex-grow ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        {imageUrl && (
          <Image src={imageUrl} alt="Card Image" className="w-48 h-48 object-cover mb-4 rounded-md" />
        )}
        {title && <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-700'}`}>{title}</h2>}
        {description && <p className={`text-xl font-semibold text-gray-700 mb-4 ${darkMode ? 'text-white' : 'text-gray-700'}`}>{description}</p>}
        {buttons && buttons.length > 0 && (
          <div className="flex space-x-4 pb-4">
            {buttons.map((button, index) => (
                <div className='flex items-center space-x-4' key={index}>
                  <button
                    className={`flex items-center space-x-2 ${darkMode ? 'text-white bg-gray-700 hover:bg-gray-500' : 'text-gray-200 bg-gray-500 hover:bg-gray-400'} text-lg font-bold rounded p-4 focus:outline-none`}
                    onClick={handleClick}
                  >
                    <IconAdd title={`Add`} className={`h-10 w-10 text-xl`} />
                    <span>{button.label}</span>
                  </button>
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutOverviewCard;