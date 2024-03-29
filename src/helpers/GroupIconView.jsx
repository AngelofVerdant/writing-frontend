import { useDarkMode } from '@/state/DarkModeProvider';

const GroupIconView = ({ children, count }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className="relative inline-block">
      <span className={`h-7 w-7 text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {children}
      </span>
      {count > 0 && (
        <span className={`absolute -top-1 -right-1 ${darkMode ? 'text-white bg-gray-700' : 'text-white bg-red-500'} rounded-full w-5 h-5 flex items-center justify-center text-base font-bold`}>
          {count}
        </span>
      )}
    </div>
  );
};

export default GroupIconView;