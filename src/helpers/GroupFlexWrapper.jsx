import { useDarkMode } from '@/state/DarkModeProvider';

const GroupFlexWrapper = ({ children }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`flex items-center justify-between space-x-2 px-4 ${darkMode ? 'text-white' : 'text-black'} lg:mx-4`}>
      {children}
    </div>
  );
};

export default GroupFlexWrapper;