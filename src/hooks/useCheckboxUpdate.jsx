import { useState, useEffect } from 'react';
import { useDarkMode } from '@/state/DarkModeProvider';

const useCheckboxUpdate = (options, perRow, preSelectedIds = []) => {
  const [checkedItems, setCheckedItems] = useState(preSelectedIds);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    setCheckedItems(preSelectedIds);
  }, [preSelectedIds]);

  const handleCheckboxChange = (id) => {
    const isChecked = checkedItems.includes(id);

    isChecked
      ? setCheckedItems(checkedItems.filter((item) => item !== id))
      : setCheckedItems([...checkedItems, id]);
  };

  const handleSelectAll = () => {
    // If all options are already selected, unselect all. Otherwise, select all.
    const allSelected = options.every((option) => checkedItems.includes(option.id));
    if (allSelected) {
      setCheckedItems([]);
    } else {
      const allOptionIds = options.map((option) => option.id);
      setCheckedItems(allOptionIds);
    }
  };

  const clearAllSelections = () => {
    setCheckedItems([]);
  };

  const checkboxes = options?.map((option) => (
    <div className={`w-full ${perRow} mb-4 md:pl-2`} key={`${option.title}_${option.id}`}>
      <label
        htmlFor={`${option.title}_${option.id}`}
        className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
          darkMode
            ? checkedItems.includes(option.id)
              ? 'bg-gray-700 text-white border border-gray-500 hover:bg-gray-600'
              : 'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700'
            : checkedItems.includes(option.id)
            ? 'bg-gray-300 text-gray-700 border border-gray-300 hover:bg-gray-300'
            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-300'
        }`}
      >
        <input
          type="checkbox"
          className="checkbox w-5 h-5"
          name={option.title}
          value={option.title}
          checked={checkedItems.includes(option.id)}
          onChange={() => handleCheckboxChange(option.id)}
          id={`${option.title}_${option.id}`}
        />
        <span className={`ml-3 capitalize font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{option.title}</span>
      </label>
    </div>
  ));

  const selectedIds = checkedItems;

  return [selectedIds, checkboxes, handleSelectAll, clearAllSelections];
};

export default useCheckboxUpdate;