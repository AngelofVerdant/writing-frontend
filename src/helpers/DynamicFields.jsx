import { IconAdd, IconDelete } from '@/icons';
import React from 'react';
import { HeadingView, LabelView } from '.';
import { useDarkMode } from '@/state/DarkModeProvider';

function DynamicFields({title, fieldNames, items, handleItemFieldChange, removeItemField, addItemField, maxFields}) {
    const { darkMode } = useDarkMode();
  return (
    <div className="w-full mb-4">
        <HeadingView size="3xl" fontWeight="bold" marginBottom={2} paddingTop={4} textLocation="left">
            {title}
        </HeadingView>
        <div className="flex flex-wrap">
        {fieldNames?.map((field, index) => (
            <div key={index} className="w-full mb-4">
                <div className="flex flex-wrap">
                    {items.map((fieldName) => (
                    <div className='w-full md:w-1/2 lg:w-1/2 px-2 mb-2' key={`${fieldName.name}-${index}`}>
                        <LabelView name={fieldName.display} forWhat={fieldName.display} />
                        <input
                        className={`appearance-none block w-full ${
                            darkMode
                              ? 'bg-gray-800 text-white border border-gray-700 focus:border-blue-500'
                              : 'bg-gray-200 text-gray-700 border border-gray-300 focus:border-blue-500'
                          } rounded py-3 px-4 leading-tight text-xl font-semibold focus:outline-none focus:ring-0 focus:ring-blue-500`}
                        id={`${fieldName.name}-${index}`}
                        type={fieldName.type}
                        placeholder={fieldName.display}
                        value={field[fieldName.name]}
                        onChange={(e) => handleItemFieldChange(index, fieldName.name, e.target.value)}
                        />
                    </div>
                    ))}
                </div>

                <div className="flex">
                    <div className="ml-auto mt-2">
                        <div className="inline-flex items-center space-x-2">
                            <button onClick={() => removeItemField(index)} className="flex items-center space-x-2 bg-stone-500 hover:bg-stone-600 text-white rounded p-2">
                            <IconDelete title={`Remove Entry`} className="h-5 w-5 text-xl" />
                            <span>{`Remove Entry`}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
        <div className="inline-flex items-center space-x-2">
            <button
                onClick={() => addItemField(maxFields)}
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white rounded p-2"
                disabled={fieldNames.length >= maxFields}
            >
                <IconAdd title={`Add Entry`} className="h-5 w-5 text-xl" />
                <span>{`Add Entry`}</span>
            </button>

        </div>
    </div>
  );
}

export default DynamicFields;