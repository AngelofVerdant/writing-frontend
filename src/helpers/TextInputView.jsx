import { useDarkMode } from '@/state/DarkModeProvider';

const TextInputView = ({ id, type, name, value, change, placeholder, preventDefaultPaste = false, autoComplete = true, disabled = false }) => {
  const { darkMode } = useDarkMode();

  const handlePaste = (e) => {
    if (preventDefaultPaste) {
      e.preventDefault();
    }
  };

  return (
    <input
      id={id}
      type={type}
      name={name}
      onPaste={handlePaste}
      disabled={disabled}
      autoComplete={autoComplete ? 'on' : 'off'}
      value={value}
      onChange={change}
      placeholder={placeholder}
      className={`appearance-none block w-full ${disabled ? 'opacity-40' : ''} ${
        darkMode
          ? 'bg-gray-800 text-white border border-gray-700 focus:border-blue-500'
          : 'bg-gray-200 text-gray-700 border border-gray-300 focus:border-blue-500'
      } rounded py-3 px-4 leading-tight text-xl font-semibold focus:outline-none focus:ring-0 focus:ring-blue-500`}
    />
  );
};

export default TextInputView;