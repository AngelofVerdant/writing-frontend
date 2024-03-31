'use client'
import React , { useState} from 'react';
import { ContainerWrapper, FlexWrapper, Messages, NoImageOverviewCard, PaginationCard, SectionOverviewWrapper } from '@/helpers';
import { usePointList } from '@/hooks';
import { PointCardSkeleton } from '@/skeletons';
import { PointFilter } from '@/filters';
import { PointCard } from '@/cards';
import { DeleteModal } from '@/modals';
import { limits, orders } from '@/data/filterOptions';

export default function Points() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const buttons = [
    { label: 'New Point', url: '/admin/s/points/new' },
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
  } = usePointList(setShowModal, setSelectedItem);

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
            title="Manage Selling Points"
            description="manage selling points"
            buttons={buttons}
        />

        </FlexWrapper>

        <FlexWrapper>
          <PointFilter
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
          {data.loading && <PointCardSkeleton number={limit}/>}
        </FlexWrapper>

        <FlexWrapper>
          {data.error && <Messages>{data.error}</Messages>}
        </FlexWrapper>

        {!data.loading && !data.error && (
          <FlexWrapper>
            {data?.data?.points?.map((point) => (
              <PointCard key={point.id} item={point} handleDeleteConfirmation={handleDeleteConfirmation} />
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