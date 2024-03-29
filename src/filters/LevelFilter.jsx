import { useDarkMode } from '@/state/DarkModeProvider';
import React from 'react';
import { FlexItemWrapper, FlexWrapper, LabelView, SelectInputView, TextInputView } from '@/helpers';

const LevelFilter = ({
  search,
  sortOrderOptions,
  sortOrder,
  limit,
  limitOptions,
  handleSearchChange,
  handleSortOrderChange,
  handleLimitChange,
}) => {
    const { darkMode } = useDarkMode();
  return (
    <div className={`w-full mb-4 ml-4 mr-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
      
      <FlexWrapper>

        <FlexItemWrapper width={`md:w-1/2`}>
          <LabelView name={`Keyword`} forWhat={`search`} />
          <TextInputView
              id={`search`}
              type={`text`}
              name={`search`}
              value={search}
              change={handleSearchChange}
              autoComplete={false}
              placeholder={`Search for levels`}
          />
        </FlexItemWrapper>

        <FlexItemWrapper width={`md:w-1/2`}>

          <FlexWrapper>

            <FlexItemWrapper width={`md:w-1/2`}>
              <LabelView name={`Order`} forWhat={`sortOrder`} />
              <SelectInputView
                id="sortOrder"
                name="sortOrder"
                value={sortOrder}
                change={handleSortOrderChange}
                options={sortOrderOptions}
                placeholder="Select Order"
              />
            </FlexItemWrapper>

            <FlexItemWrapper width={`md:w-1/2`}>
              <LabelView name={`Limit`} forWhat={`limit`} />
              <SelectInputView
                id="limit"
                name="limit"
                value={limit}
                change={handleLimitChange}
                options={limitOptions}
                placeholder="Select Limit"
              />
            </FlexItemWrapper>

          </FlexWrapper>

        </FlexItemWrapper>

      </FlexWrapper>
      
    </div>
  );
};

export default LevelFilter;