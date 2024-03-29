import { useDarkMode } from '@/state/DarkModeProvider';

const GroupAbsoluteViewAndIcon = ({ children }) => {
  const { darkMode } = useDarkMode();

  return (
    <span className={`flex items-center justify-between px-4 py-2 mb-1 font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} rounded hover:${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        {children}
    </span>
  );
};

export default GroupAbsoluteViewAndIcon;