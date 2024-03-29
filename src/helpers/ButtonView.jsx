import { useDarkMode } from "@/state/DarkModeProvider";

const ButtonView = ({ children, onClick, type, size }) => {
  const { darkMode } = useDarkMode();

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-sm py-2 px-4';
      case 'medium':
        return 'text-base py-3 px-6';
      case 'large':
        return 'text-lg py-4 px-8';
      default:
        return 'text-base py-3 px-6';
    }
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded focus:outline-none focus:shadow-outline ${getSizeClasses()} ${
        darkMode ? 'text-white bg-gray-600 hover:bg-gray-500' : 'text-white bg-gray-600 hover:bg-gray-500'
      }`}
    >
      {children}
    </button>
  );
};

export default ButtonView;