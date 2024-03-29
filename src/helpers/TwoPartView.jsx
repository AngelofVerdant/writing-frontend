import { useDarkMode } from '@/state/DarkModeProvider';

const TwoPartView = ({ title1, title2 }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`flex items-center justify-between w-full ${
        darkMode
          ? 'bg-gray-800 text-white border border-gray-700'
          : 'bg-gray-200 text-gray-700 border border-gray-300'
      } rounded-xl py-4`}>
      <div className={`w-1/3 px-4 text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {title1}
      </div>
      <div className="w-1/3 flex justify-center">
        <div className={`h-6 w-px ${darkMode ? 'bg-gray-600' : 'bg-gray-400'}`}></div>
      </div>
      <div className={`w-1/3 ml-2 pr-2 text-2xl font-bold text-right ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        {title2}
      </div>
    </div>
  );
};

export default TwoPartView;