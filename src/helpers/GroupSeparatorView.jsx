import { useDarkMode } from '@/state/DarkModeProvider';

const GroupSeparatorView = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`mb-2 border-t border-${darkMode ? 'gray-700' : 'gray-300'}`}>

    </div>
  );
};

export default GroupSeparatorView;