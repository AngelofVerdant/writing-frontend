'use client'
import React , { useState} from 'react';
import { ContainerWrapper, FlexWrapper, Messages, OverviewCard, PaginationCard, SectionOverviewWrapper } from '@/helpers';
import { level } from '@/assets';
import { useLevelList } from '@/hooks';
import { LevelCardSkeleton } from '@/skeletons';
import { LevelFilter } from '@/filters';
import { LevelCard } from '@/cards';
import { DeleteModal } from '@/modals';
import { limits, orders } from '@/data/filterOptions';

export default function Levels() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const buttons = [
    { label: 'New Education Level', url: '/admin/h/levels/new' },
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
  } = useLevelList(setShowModal, setSelectedItem);

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
            imageUrl={level}
            title="Manage Education Levels"
            description="Effortlessly add, organize, and track education levels. Keep detailed records of each level, including descriptions and pricing."
            buttons={buttons}
        />

        </FlexWrapper>

        <FlexWrapper>
          <LevelFilter
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
          {data.loading && <LevelCardSkeleton number={limit}/>}
        </FlexWrapper>

        <FlexWrapper>
          {data.error && <Messages>{data.error}</Messages>}
        </FlexWrapper>

        {!data.loading && !data.error && (
          <FlexWrapper>
            {data?.data?.levels?.map((level) => (
              <LevelCard key={level.id} item={level} handleDeleteConfirmation={handleDeleteConfirmation} />
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