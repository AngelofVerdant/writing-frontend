import { useDarkMode } from '@/state/DarkModeProvider';

const TwoPartCardSkeleton = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`flex items-center justify-between w-full ${
        darkMode
          ? 'bg-gray-800 text-white border border-gray-700'
          : 'bg-gray-200 text-gray-700 border border-gray-300'
      } rounded-xl py-4`}>
      <div className={`w-1/3 px-4 text-2xl font-bold ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}>
        
      </div>
      <div className="w-1/3 flex justify-center">
        
      </div>
      <div className={`w-1/3 ml-2 pr-2 text-2xl font-bold text-right ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}>
        
      </div>
    </div>
  );
};

export default TwoPartCardSkeleton;