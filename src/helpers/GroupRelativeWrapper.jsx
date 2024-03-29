import { useDarkMode } from '@/state/DarkModeProvider';

const GroupRelativeWrapper = ({ children }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`group relative cursor-pointer py-2 ${darkMode ? 'text-white' : 'text-black'}`}>
      {children}
    </div>
  );
};

export default GroupRelativeWrapper;