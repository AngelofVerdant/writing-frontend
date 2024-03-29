'use client'
import { ContainerWrapper, FlexWrapper, Messages, OverviewCard, PaginationCard, SectionOverviewWrapper } from '@/helpers';
import { users } from '@/assets';
import { useAdminUserList } from '@/hooks';
import { AdminUserCardSkeleton } from '@/skeletons';
import { AdminUserFilter } from '@/filters';
import { AdminUserCard } from '@/cards';
import { limits, orders } from '@/data/filterOptions';

export default function AdminUsers() {
  const {
    data,
    filters,
    sortOrder,
    page,
    limit,
    search,
    totalPages,
    handleFilterChange,
    handleSortOrderChange,
    handleSearchChange,
    handleLimitChange,
    handlePageChange,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
  } = useAdminUserList();

  return (
    <ContainerWrapper>
      <SectionOverviewWrapper>
        <FlexWrapper>
        <OverviewCard
            imageUrl={users}
            title="Manage Users"
            description="Manage users"
        />

        </FlexWrapper>

        <FlexWrapper>
          <AdminUserFilter
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
          {data.loading && <AdminUserCardSkeleton number={limit}/>}
        </FlexWrapper>

        <FlexWrapper>
          {data.error && <Messages>{data.error}</Messages>}
        </FlexWrapper>

        {!data.loading && !data.error && (
          <FlexWrapper>
            {data?.data?.users?.map((user) => (
              <AdminUserCard key={user.id} item={user} />
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

      </SectionOverviewWrapper>
    </ContainerWrapper>
  );
}