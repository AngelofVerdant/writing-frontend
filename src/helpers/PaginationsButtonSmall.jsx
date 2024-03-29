import { useDarkMode } from '@/state/DarkModeProvider';

const PaginationButtonSmall = ({ condition, click, disabled, label, Icon }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`px-2 py-1`}>
        <div className={`inline-flex items-center space-x-2 ${condition ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}>
            <Icon disabled={disabled} onClick={click} title={label} className="h-5 w-5 text-xl" />
        </div>
    </div>
  );
};
export default PaginationButtonSmall;