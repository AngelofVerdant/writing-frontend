import { useDarkMode } from '@/state/DarkModeProvider';

const FlexButton = ({children, label}) => {
  const { darkMode } = useDarkMode();
  return (
    <button className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-500 hover:bg-gray-600'} text-white rounded p-2 focus:outline-none`}>
        {children}
        <span>{label}</span>
    </button>
  );
};

export default FlexButton;