import { useDarkMode } from '@/state/DarkModeProvider';

const MobileNavWrapper = ({children, menu, admin}) => {
  const { darkMode } = useDarkMode();
  return (
    <nav className={`block md:hidden ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} overflow-y-auto ${menu || admin ? 'fixed top-0 left-0 right-0 bottom-0 z-50' : 'z-0'}`}>
        {children}
    </nav>
  );
};

export default MobileNavWrapper;