import { useDarkMode } from '@/state/DarkModeProvider';

const DropDownView = ({ id, name, value, change, options, placeholder, autoComplete = true }) => {
  const { darkMode } = useDarkMode();

  return (
    <select
      id={id}
      name={name}
      autoComplete={autoComplete ? 'on' : 'off'}
      value={value}
      onChange={change}
      className={`appearance-none block w-full ${
        darkMode
          ? 'bg-gray-800 text-white border border-gray-700 focus:border-blue-500'
          : 'bg-gray-200 text-gray-700 border border-gray-300 focus:border-blue-500'
      } rounded py-3 px-4 leading-tight text-xl font-semibold focus:outline-none focus:ring-0 focus:ring-blue-500`}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default DropDownView;