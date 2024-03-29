import { useDarkMode } from '@/state/DarkModeProvider';

const ModalWrapper = ({ children }) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto`}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className={`fixed inset-0 bg-opacity-75 transition-opacity ${darkMode ? 'bg-gray-800' : 'bg-gray-400'}`}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-400'} inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full`}>
                {children}
            </div>
        </div>
    </div>
  );
};

export default ModalWrapper;