import { useDarkMode } from '@/state/DarkModeProvider';

const MenuHoverGroupWrapper = ({children}) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`mx-4 group w-full ${darkMode ? 'text-white hover:border-b-4 hover:border-gray-300' : 'text-black hover:border-b-4 hover:border-blue-800'}`}>
        {children}
    </div>
  );
};

export default MenuHoverGroupWrapper;