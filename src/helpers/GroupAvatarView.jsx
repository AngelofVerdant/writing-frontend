import { useDarkMode } from '@/state/DarkModeProvider';

const GroupAvatarView = ({ children }) => {
  const { darkMode } = useDarkMode();

  return (
    <span className={`h-7 w-7 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
      {children}
    </span>
  );
};

export default GroupAvatarView;