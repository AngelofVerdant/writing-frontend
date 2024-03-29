import { useDarkMode } from '@/state/DarkModeProvider';

const MenuHoverHeading = ({children}) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`block px-4 py-2 mb-1 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} rounded hover:${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        {children}
    </div>
  );
};

export default MenuHoverHeading;