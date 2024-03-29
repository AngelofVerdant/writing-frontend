import Link from 'next/link';
import { IconLeft } from '@/icons';
import { useDarkMode } from '@/state/DarkModeProvider';

const HeaderActionView = ({ itemText }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`hidden md:block w-full p-4 m-0 mb-2 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <div className="mt-2">
        <div className="flex flex-wrap -mx-4 mt-4">
          <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0 p-6">
            <h1 className="block capitalize tracking-wide text-3xl font-bold mb-2">
              {itemText}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderActionView;