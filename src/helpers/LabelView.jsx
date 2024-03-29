import { useDarkMode } from '@/state/DarkModeProvider';

const LabelView = ({ name, forWhat }) => {
  const { darkMode } = useDarkMode();

  return (
    <label
      className={`block capitalize tracking-wide text-xl font-bold mb-4 mt-4 ${
        darkMode ? 'text-white' : 'text-gray-600'
      }`}
      htmlFor={forWhat}
    >
      {name}
    </label>
  );
};

export default LabelView;