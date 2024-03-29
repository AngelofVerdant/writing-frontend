import { IconSave, IconSpinner } from '../icons';
import { useDarkMode } from '@/state/DarkModeProvider';

const FooterActionView = ({ handleSubmit, data, createText }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`flex justify-start items-center space-x-4 mt-2 w-full pt-4 m-0`}>
      <div className={`mb-4 ml-4`}>
        <div className={`inline-flex items-center space-x-2`}>
          <button className={`flex items-center space-x-2 ${data.loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${darkMode ? 'text-white bg-gray-800 hover:bg-gray-600' : 'text-gray-200 bg-gray-500 hover:bg-gray-400'} text-lg font-bold rounded p-2 focus:outline-none`} onClick={!data.loading ? handleSubmit : undefined}>
            {data.loading ? (
              <IconSpinner className={`h-5 w-5 text-xl`} />
              ) : (
              <IconSave title={`${createText}`} className="h-5 w-5 text-xl" />
            )}
            <span>{`${createText}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterActionView;