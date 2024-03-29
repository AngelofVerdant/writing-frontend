import { useDarkMode } from '@/state/DarkModeProvider';

const MobileSpanView = ({children}) => {
  const { darkMode } = useDarkMode();
  return (
    <span className={`ml-0 text-base font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {children}
    </span>
  );
};

export default MobileSpanView;