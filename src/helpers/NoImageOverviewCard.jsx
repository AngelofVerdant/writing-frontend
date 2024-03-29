import Link from 'next/link';
import { useDarkMode } from '@/state/DarkModeProvider';
import { IconAdd } from '@/icons';

const NoImageOverviewCard = ({ title, description, buttons }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`w-full p-4 pt-0 pb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
      <div className={`p-2 rounded-lg flex flex-col lg:flex-row items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <div className={`lg:w-3/4 lg:pr-4 p-4`}>
          {title && <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-700'}`}>{title}</h2>}
          {description && <div className={`prose md:prose-2xl lg:prose-3xl font-semibold ${darkMode ? 'text-white' : 'text-gray-700'}`}>{description}</div>}
        </div>
        {buttons && buttons.length > 0 && (
          <div className={`flex flex-col lg:w-1/4 lg:pl-4 lg:pt-0 pt-4 p-4 lg:justify-end`}>
            {buttons.map((button, index) => (
              <Link href={button.url} key={index}>
                <button
                  className={`flex items-center space-x-2 ${darkMode ? 'text-white bg-gray-800 hover:bg-gray-600' : 'text-gray-200 bg-gray-500 hover:bg-gray-400'} text-lg font-bold rounded p-4 focus:outline-none mb-4`}
                >
                  <IconAdd title={`Add`} className={`h-10 w-10 text-xl`} />
                  <span>{button.label}</span>
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoImageOverviewCard;