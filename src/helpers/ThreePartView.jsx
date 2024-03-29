import { useDarkMode } from '@/state/DarkModeProvider';

const ThreePartView = ({ title1, title2, title3 }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`flex items-center justify-between w-full ${
        darkMode
          ? 'bg-gray-800 text-white border border-gray-700 focus:border-blue-500'
          : 'bg-gray-200 text-gray-700 border border-gray-300 focus:border-blue-500'
      } rounded py-3 px-4 leading-tight text-lg font-semibold focus:outline-none focus:ring-0 focus:ring-blue-500`}>
      <div className={`w-1/4 px-4 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
        {title1}
      </div>
      <div className="w-1/4 flex justify-center">
        <div className={`h-6 w-px bg-gray-300 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
      </div>
      <div className={`w-1/4 px-4 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
        {title2}
      </div>
      <div className="w-1/4 flex justify-center">
        <div className={`h-6 w-px bg-gray-300 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
      </div>
      <div className={`w-1/4 px-4 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
        {title3}
      </div>
    </div>
  );
};

export default ThreePartView;