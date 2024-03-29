import { useDarkMode } from '@/state/DarkModeProvider';

const MobileFlexSpanAndIcon = ({children}) => {
  const { darkMode } = useDarkMode();
  return (
    <span className={`flex justify-between ml-0 text-base font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'} capitalize`}>
        {children}
    </span>
  );
};

export default MobileFlexSpanAndIcon;