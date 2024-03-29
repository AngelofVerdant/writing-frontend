import { useDarkMode } from "@/state/DarkModeProvider";

const ButtonCustomView = ({ children, click, condition, disabled }) => {
const { darkMode } = useDarkMode();
  return (
    <button disabled={disabled} onClick={!condition ? click : undefined} className={`flex items-center space-x-2 text-lg font-bold ${darkMode ? 'text-white bg-gray-800 hover:bg-gray-600' : 'text-gray-200 bg-gray-500 hover:bg-gray-400'} ${condition ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} rounded p-4 focus:outline-none`}>
        {children}
    </button>
  );
};

export default ButtonCustomView;