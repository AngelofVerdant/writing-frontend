import { useDarkMode } from '@/state/DarkModeProvider';

const MobileItemView = ({children}) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`p-4 mt-2 mb-2 mx-2 rounded md:w-1/2 lg:w-1/4 cursor-pointer border border-${darkMode ? 'gray-700' : 'gray-300'}`}>
        {children}
    </div>
  );
};

export default MobileItemView;