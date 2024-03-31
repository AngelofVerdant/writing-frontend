'use client'
import React , { useState} from 'react';
import { ContainerWrapper, FlexWrapper, Messages, NoImageOverviewCard, PaginationCard, SectionOverviewWrapper } from '@/helpers';
import { usePhaseList } from '@/hooks';
import { PhaseCardSkeleton } from '@/skeletons';
import { PhaseFilter } from '@/filters';
import { PhaseCard } from '@/cards';
import { DeleteModal } from '@/modals';
import { limits, orders } from '@/data/filterOptions';

export default function Phases() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const buttons = [
    { label: 'New Phase', url: '/admin/s/phases/new' },
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
  } = usePhaseList(setShowModal, setSelectedItem);

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
            title="Manage Phases"
            description="manage Phases"
            buttons={buttons}
        />

        </FlexWrapper>

        <FlexWrapper>
          <PhaseFilter
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
          {data.loading && <PhaseCardSkeleton number={limit}/>}
        </FlexWrapper>

        <FlexWrapper>
          {data.error && <Messages>{data.error}</Messages>}
        </FlexWrapper>

        {!data.loading && !data.error && (
          <FlexWrapper>
            {data?.data?.phases?.map((phase) => (
              <PhaseCard key={phase.id} item={phase} handleDeleteConfirmation={handleDeleteConfirmation} />
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