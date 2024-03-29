import { useDarkMode } from '@/state/DarkModeProvider';

const OnePartView = ({ title }) => {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`appearance-none block w-full ${
        darkMode
          ? 'bg-gray-800 text-white border border-gray-700 focus:border-blue-500'
          : 'bg-gray-200 text-gray-700 border border-gray-300 focus:border-blue-500'
      } rounded py-3 px-4 leading-tight text-xl font-semibold focus:outline-none focus:ring-0 focus:ring-blue-500`}
    >
        {title}
    </div>
  );
};

export default OnePartView;