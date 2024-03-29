import { useDarkMode } from '@/state/DarkModeProvider';

const GroupAbsoluteWrapper = ({ children }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`w-full invisible absolute z-50 flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'} py-2 px-4 text-gray-800 shadow-lg group-hover:visible rounded-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {children}
    </div>
  );
};

export default GroupAbsoluteWrapper;