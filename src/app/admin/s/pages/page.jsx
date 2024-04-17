'use client'
import React , { useState} from 'react';
import { ContainerWrapper, FlexWrapper, Messages, NoImageOverviewCard, PaginationCard, SectionOverviewWrapper } from '@/helpers';
import { usePageList } from '@/hooks';
import { PageCardSkeleton } from '@/skeletons';
import { PageFilter } from '@/filters';
import { PageCard } from '@/cards';
import { DeleteModal } from '@/modals';
import { limits, orders } from '@/data/filterOptions';

export default function Pages() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const buttons = [
    { label: 'New Page', url: '/admin/s/pages/new' },
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
  } = usePageList(setShowModal, setSelectedItem);

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
        <NoImageOverviewCard
            title="Manage Pages"
            description="manage pages"
            buttons={buttons}
        />

        </FlexWrapper>

        <FlexWrapper>
          <PageFilter
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
          {data.loading && <PageCardSkeleton number={limit}/>}
        </FlexWrapper>

        <FlexWrapper>
          {data.error && <Messages>{data.error}</Messages>}
        </FlexWrapper>

        {!data.loading && !data.error && (
          <FlexWrapper>
            {data?.data?.pages?.map((page) => (
              <PageCard key={page.id} item={page} handleDeleteConfirmation={handleDeleteConfirmation} />
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