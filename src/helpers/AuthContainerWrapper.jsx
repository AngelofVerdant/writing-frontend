import { useDarkMode } from '@/state/DarkModeProvider';

const AuthContainerWrapper = ({ children }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`container w-full md:max-w-full sm:max-w-full xl:max-w-full mx-auto pt-4 pb-4 mt-0 mb-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}>
      {children}
    </div>
  );
};

export default AuthContainerWrapper;
