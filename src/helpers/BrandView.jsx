import { useDarkMode } from '@/state/DarkModeProvider';

const BrandView = ({children, label}) => {
  const { darkMode } = useDarkMode();
  return (
    <span className={`ml-2 text-lg font-bold ${darkMode ? 'text-white' : ''}`}>
        {children}
    </span>
  );
};

export default BrandView;