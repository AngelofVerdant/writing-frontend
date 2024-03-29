import { useDarkMode } from '@/state/DarkModeProvider';

const MenuHoverAbsoluteWrapper = ({children}) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`hidden absolute top-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md z-10 group-hover:flex left-0 flex-wrap w-full`}>
        {children}
    </div>
  );
};

export default MenuHoverAbsoluteWrapper;