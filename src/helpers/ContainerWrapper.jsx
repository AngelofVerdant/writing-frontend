import { useDarkMode } from '@/state/DarkModeProvider';

const ContainerWrapper = ({ children }) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`container w-full md:max-w-full sm:max-w-full xl:max-w-full mx-auto p-4 pt-0 pb-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}>
      {children}
    </div>
  );
};

export default ContainerWrapper;