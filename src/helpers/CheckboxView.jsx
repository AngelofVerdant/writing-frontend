import { useDarkMode } from '@/state/DarkModeProvider';

const CheckboxView = ({ id, name, checked, change, title, disabled = false }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`w-full mb-4 md:pl-2`}>
      <label
        htmlFor={`checkbox_${id}`}
        className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${disabled ? 'opacity-40' : ''} ${
          darkMode
            ? checked
              ? 'bg-gray-700 text-white border border-gray-500 hover:bg-gray-600'
              : 'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700'
            : checked
            ? 'bg-gray-300 text-gray-700 border border-gray-300 hover:bg-gray-300'
            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-300'
        }`}
      >
        <input
          type="checkbox"
          className="checkbox w-5 h-5"
          name={name}
          value={name}
          checked={checked}
          onChange={change}
          disabled={disabled}
          id={`checkbox_${id}`}
        />
        <span className={`ml-3 capitalize font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</span>
      </label>
    </div>
  );
};

export default CheckboxView;