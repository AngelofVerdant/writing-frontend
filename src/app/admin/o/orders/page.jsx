'use client'
import React , { useState} from 'react';
import { ContainerWrapper, FlexWrapper, Messages, OverviewCard, PaginationCard, SectionOverviewWrapper } from '@/helpers';
import { order } from '@/assets';
import { useAdminOrderList } from '@/hooks';
import { AdminOrderCardSkeleton } from '@/skeletons';
import { AdminOrderFilter } from '@/filters';
import { AdminOrderCard } from '@/cards';
import { AssignModal } from '@/modals';
import { limits, orders } from '@/data/filterOptions';

export default function AdminOrders() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    data,
    updateData,
    filters,
    sortOrder,
    page,
    limit,
    search,
    totalPages,
    handleFilterChange,
    handleSortOrderChange,
    handleUpdate,
    handleSearchChange,
    handleLimitChange,
    handlePageChange,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
  } = useAdminOrderList(setShowModal, setSelectedItem);

  const handleCancel = () => {
    updateData.error = "";
    setSelectedItem(null);
    setShowModal(false);
  };

  const handleAssignConfirmation = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <ContainerWrapper>
      <SectionOverviewWrapper>
        <FlexWrapper>
        <OverviewCard
            imageUrl={order}
            title="Manage Order Requests"
            description="Manage and assign orders to writers"
        />

        </FlexWrapper>

        <FlexWrapper>
          <AdminOrderFilter
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
          {data.loading && <AdminOrderCardSkeleton number={limit}/>}
        </FlexWrapper>

        <FlexWrapper>
          {data.error && <Messages>{data.error}</Messages>}
        </FlexWrapper>

        {!data.loading && !data.error && (
          <FlexWrapper>
            {data?.data?.orders?.map((order) => (
              <AdminOrderCard key={order.id} item={order} handleAssignConfirmation={handleAssignConfirmation} />
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
            <AssignModal
              itemName={selectedItem?.title}
              item={selectedItem}
              updateData={updateData}
              handleUpdate={handleUpdate}
              handleCancel={handleCancel}
              showModal={showModal}
            />
        </FlexWrapper>

      </SectionOverviewWrapper>
    </ContainerWrapper>
  );
}