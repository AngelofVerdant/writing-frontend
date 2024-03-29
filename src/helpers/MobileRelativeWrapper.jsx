import { useDarkMode } from '@/state/DarkModeProvider';

const MobileRelativeWrapper = ({children}) => {
    const { darkMode } = useDarkMode();
    return (
        <div className={`relative h-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          {children}
        </div>
    );
  };
  
export default MobileRelativeWrapper;