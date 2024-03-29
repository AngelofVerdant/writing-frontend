import { useDarkMode } from "@/state/DarkModeProvider";

export default function Spinner() {
  const { darkMode } = useDarkMode();
    return (
      <div className="flex justify-center items-center">
        <div className="flex space-x-2">
          <div className={`w-3 h-3 rounded-full animate-bounce ${darkMode ? 'bg-white' : 'bg-gray-600'}`}></div>
          <div className={`w-3 h-3 rounded-full animate-bounce ${darkMode ? 'bg-white' : 'bg-gray-600'}`}></div>
          <div className={`w-3 h-3 rounded-full animate-bounce ${darkMode ? 'bg-white' : 'bg-gray-600'}`}></div>
        </div>
      </div>
    );
}