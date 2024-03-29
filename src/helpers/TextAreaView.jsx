import { useDarkMode } from '@/state/DarkModeProvider';

const TextAreaView = ({ id, name, value, change, rows, maxLength, minLength, placeholder, preventDefaultPaste = false, autoComplete = true }) => {
  const { darkMode } = useDarkMode();
  const handlePaste = (e) => {
    if (preventDefaultPaste) {
      e.preventDefault();
    }
  };

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={change}
      rows={rows}
      maxLength={maxLength}
      minLength={minLength}
      spellCheck='true'
      onPaste={handlePaste}
      autoComplete={autoComplete ? 'on' : 'off'}
      autoCapitalize="sentences"
      autoCorrect="on"
      wrap="soft"
      placeholder={placeholder}
      className={`appearance-none block w-full ${
        darkMode
          ? 'bg-gray-800 text-white border border-gray-700 focus:border-blue-500'
          : 'bg-gray-200 text-gray-700 border border-gray-300 focus:border-blue-500'
      } rounded py-3 px-4 leading-tight text-xl font-semibold focus:outline-none focus:ring-0 focus:ring-blue-500`}
    />
  );
};

export default TextAreaView;