'use client'
import React , { useState} from 'react';
import { ContainerWrapper, FlexWrapper, Messages, NoImageOverviewCard, PaginationCard, SectionOverviewWrapper } from '@/helpers';
import { useOrderList } from '@/hooks';
import { OrderCardSkeleton } from '@/skeletons';
import { OrderFilter } from '@/filters';
import { PaymentModal } from '@/modals';
import { limits, orders } from '@/data/filterOptions';
import { OrderCard } from '@/cards';

export default function UserOrders() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    data,
    updateData,
    downloadData,
    filters,
    sortOrder,
    page,
    limit,
    search,
    totalPages,
    handleFilterChange,
    handleSortOrderChange,
    handlePayment,
    handleDownload,
    handleSearchChange,
    handleLimitChange,
    handlePageChange,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
  } = useOrderList(setShowModal, setSelectedItem);

  const handleCancel = () => {
    updateData.error = "";
    setSelectedItem(null);
    setShowModal(false);
  };

  const handlePaymentConfirmation = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <ContainerWrapper>
      <SectionOverviewWrapper>
        <FlexWrapper>
        <NoImageOverviewCard
            title="Orders"
            description="Manage your orders."
        />

        </FlexWrapper>

        <FlexWrapper>
          <OrderFilter
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
          {data.loading && <OrderCardSkeleton number={limit}/>}
        </FlexWrapper>

        <FlexWrapper>
          {data.error && <Messages>{data.error}</Messages>}
        </FlexWrapper>

        {!data.loading && !data.error && (
          <FlexWrapper>
            {data?.data?.orders?.map((order) => (
              <OrderCard key={order.id} item={order} handlePaymentConfirmation={handlePaymentConfirmation} handleDownload={handleDownload} />
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
            <PaymentModal
              itemName={selectedItem?.title}
              item={selectedItem}
              updateData={updateData}
              handlePayment={handlePayment}
              handleCancel={handleCancel}
              showModal={showModal}
            />
        </FlexWrapper>

      </SectionOverviewWrapper>
    </ContainerWrapper>
  );
}