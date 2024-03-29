import { useDarkMode } from '@/state/DarkModeProvider';

const MobileIconWrapper = ({children}) => {
    const { darkMode } = useDarkMode();
    return (
        <div className={`mx-2 text-xl ${darkMode ? 'text-white' : 'text-gray-700'}`}>
          {children}
        </div>
    );
  };
  
export default MobileIconWrapper;