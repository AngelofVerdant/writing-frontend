'use client'
import React , { useState} from 'react';
import { ContainerWrapper, FlexWrapper, Messages, OverviewCard, PaginationCard, SectionOverviewWrapper } from '@/helpers';
import { paper } from '@/assets';
import { usePaperList } from '@/hooks';
import { PaperCardSkeleton } from '@/skeletons';
import { PaperFilter } from '@/filters';
import { PaperCard } from '@/cards';
import { DeleteModal } from '@/modals';
import { limits, orders } from '@/data/filterOptions';

export default function Papers() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const buttons = [
    { label: 'New Paper', url: '/admin/h/papers/new' },
  ];
  const {
    data,
    deleteData,
    filters,
    sortOrder,
    page,
    limit,
    search,
    totalPages,
    handleFilterChange,
    handleSortOrderChange,
    handleDeletion,
    handleSearchChange,
    handleLimitChange,
    handlePageChange,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
  } = usePaperList(setShowModal, setSelectedItem);

  const handleCancel = () => {
    deleteData.error = "";
    setSelectedItem(null);
    setShowModal(false);
  };

  const handleDeleteConfirmation = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <ContainerWrapper>
      <SectionOverviewWrapper>
        <FlexWrapper>
        <OverviewCard
            imageUrl={paper}
            title="Manage Papers"
            description="Streamline your workflow by maintaining a comprehensive record of each paper's specifications, including topics, formats, and pricing."
            buttons={buttons}
        />

        </FlexWrapper>

        <FlexWrapper>
          <PaperFilter
            search={search}
            sortOrderOptions={orders}
            sortOrder={sortOrder}
            limit={limit}
            limitOptions={limits}
            handleSearchChange={handleSearchChange}
            handleSortOrderChange={handleSortOrderChange}
            handleLimitChange={handleLimitChange}
            defaultSortOrder={`asc`}
          />
        </FlexWrapper>

        <FlexWrapper>
          {data.loading && <PaperCardSkeleton number={limit}/>}
        </FlexWrapper>

        <FlexWrapper>
          {data.error && <Messages>{data.error}</Messages>}
        </FlexWrapper>

        {!data.loading && !data.error && (
          <FlexWrapper>
            {data?.data?.papers?.map((paper) => (
              <PaperCard key={paper.id} item={paper} handleDeleteConfirmation={handleDeleteConfirmation} />
            ))}
          </FlexWrapper>
        )}

        <FlexWrapper>
          <PaginationCard 
            page={page} 
            data={data}
            limit={limit} 
            handlePageChange={handlePageChange} 
            goToFirstPage ={goToFirstPage}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            goToLastPage={goToLastPage}
            totalPages={totalPages}
          />
        </FlexWrapper>

        <FlexWrapper>
            <DeleteModal
              itemName={selectedItem?.title}
              item={selectedItem}
              deleteData={deleteData}
              handleDeletion={handleDeletion}
              handleCancel={handleCancel}
              showModal={showModal}
            />
        </FlexWrapper>

      </SectionOverviewWrapper>
    </ContainerWrapper>
  );
}