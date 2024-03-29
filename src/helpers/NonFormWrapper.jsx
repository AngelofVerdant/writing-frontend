import { useDarkMode } from '@/state/DarkModeProvider';

const NonFormWrapper = ({ children }) => {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`flex flex-wrap w-full mb-4 p-4 m-0 rounded-md focus:outline-none ${
        darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-500'
      } focus:ring-2 focus:ring-blue-500`}
    >
      {children}
    </div>
  );
};
export default NonFormWrapper;