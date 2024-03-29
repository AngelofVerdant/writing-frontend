import { useDarkMode } from '@/state/DarkModeProvider';

const InlineFlexWrapper = ({children}) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`inline-flex items-center space-x-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {children}
    </div>
  );
};

export default InlineFlexWrapper;