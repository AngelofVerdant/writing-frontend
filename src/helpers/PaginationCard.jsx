import React from 'react';
import { IconLeft, IconPageFirst, IconPageLast, IconRight } from '@/icons';
import { useDarkMode } from '@/state/DarkModeProvider';
import { PaginationButton, PaginationButtonSmall } from '.';

const PaginationCard = ({ data, page, totalPages, goToFirstPage, goToPreviousPage, goToNextPage, goToLastPage }) => {
  const { darkMode } = useDarkMode()
  return (
      <div className={`mt-4 ml-4 mr-4 w-full p-2 rounded-lg flex justify-center items-center ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>
        <nav className="hidden md:flex items-center">
          <PaginationButton
            condition={data.loading || page === 1}
            click={goToFirstPage}
            disabled={data.loading || page === 1}
            label={`First Page`}
            Icon={IconPageFirst}
          />
          <PaginationButton
            condition={data.loading || page === 1}
            click={goToPreviousPage}
            disabled={data.loading || page === 1}
            label={`Previous Page`}
            Icon={IconLeft}
          />
          <PaginationButton
            condition={data.loading || page === totalPages}
            click={goToNextPage}
            disabled={data.loading || page === totalPages}
            label={`Next Page`}
            Icon={IconRight}
          />
          <PaginationButton
            condition={data.loading || page === totalPages}
            click={goToLastPage}
            disabled={data.loading || page === totalPages}
            label={`Last Page`}
            Icon={IconPageLast}
          />
        </nav>
        <nav className='md:hidden flex items-center'>
          <PaginationButtonSmall
            condition={data.loading || page === 1}
            click={goToFirstPage}
            disabled={data.loading || page === 1}
            label={`First Page`}
            Icon={IconPageFirst}
          />
          <PaginationButtonSmall
            condition={data.loading || page === 1}
            click={goToPreviousPage}
            disabled={data.loading || page === 1}
            label={`Previous Page`}
            Icon={IconLeft}
          />
          <PaginationButtonSmall
            condition={data.loading || page === totalPages}
            click={goToNextPage}
            disabled={data.loading || page === totalPages}
            label={`Next Page`}
            Icon={IconRight}
          />
          <PaginationButtonSmall
            condition={data.loading || page === totalPages}
            click={goToLastPage}
            disabled={data.loading || page === totalPages}
            label={`Last Page`}
            Icon={IconPageLast}
          />
        </nav>
        <span className={`ml-auto font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-600'}`}>
          Page {page} of {totalPages}
        </span>
      </div>
  );
};
export default PaginationCard;