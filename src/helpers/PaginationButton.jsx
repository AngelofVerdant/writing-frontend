import { useDarkMode } from '@/state/DarkModeProvider';

const PaginationButton = ({ condition, click, disabled, label, Icon }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`px-2 py-1`}>
        <div className={`inline-flex items-center space-x-2 ${condition ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}>
            <button 
                onClick={click}
                disabled={disabled}
                className={`flex items-center space-x-2 rounded-lg p-4 ${darkMode ? 'text-white bg-gray-800 hover:bg-gray-600' : 'text-gray-700 bg-gray-300 hover:bg-gray-200'}`}>
                <Icon title={label} className="h-6 w-6" />
                <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-600'}`} >{label}</span>
            </button>
        </div>
    </div>
  );
};
export default PaginationButton;