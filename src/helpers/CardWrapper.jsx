import { useDarkMode } from "@/state/DarkModeProvider";

const CardWrapper = ({ children }) => {
const { darkMode } = useDarkMode();
  return (
    <div className={`w-full mb-4 ml-4 mr-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
        {children}
    </div>
  );
};

export default CardWrapper;