import { useDarkMode } from '@/state/DarkModeProvider';

const DesktopNavWrapper = ({children}) => {
  const { darkMode } = useDarkMode();
  return (
    <nav className={`hidden md:block items-center justify-center mx-auto max-w-screen-7xl p-2 ${darkMode ? 'bg-gray-800 text-white' : ''}`}>
        {children}
    </nav>
  );
};

export default DesktopNavWrapper;