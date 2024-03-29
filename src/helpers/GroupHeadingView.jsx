import { useDarkMode } from '@/state/DarkModeProvider';

const GroupHeadingView = ({ children }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`my-2 py-2 text-base font-medium ${darkMode ? 'text-white' : 'text-black'} lg:mx-4`}>
      {children}
    </div>
  );
};

export default GroupHeadingView;