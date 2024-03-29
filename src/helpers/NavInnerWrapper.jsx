import { useDarkMode } from '@/state/DarkModeProvider';

const NavInnerWrapper = ({children}) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`flex items-center justify-between p-4 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
        {children}
    </div>
  );
};

export default NavInnerWrapper;