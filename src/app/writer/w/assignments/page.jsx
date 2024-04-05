'use client'
import { ContainerWrapper, FlexWrapper, Messages, NoImageOverviewCard, PaginationCard, SectionOverviewWrapper } from '@/helpers';
import { useAssignmentList } from '@/hooks';
import { AssignmentCardSkeleton } from '@/skeletons';
import { AssignmentFilter } from '@/filters';
import { limits, orders } from '@/data/filterOptions';
import { AssignmentCard } from '@/cards';

export default function WriterAssignments() {
  const {
    data,
    downloadData,
    filters,
    sortOrder,
    page,
    limit,
    search,
    totalPages,
    handleFilterChange,
    handleSortOrderChange,
    handleDownload,
    handleSearchChange,
    handleLimitChange,
    handlePageChange,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
  } = useAssignmentList();

  return (
    <ContainerWrapper>
      <SectionOverviewWrapper>
        <FlexWrapper>
        <NoImageOverviewCard
            title="Assignments"
            description="Manage assignments."
        />

        </FlexWrapper>

        <FlexWrapper>
          <AssignmentFilter
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
          {data.loading && <AssignmentCardSkeleton number={limit}/>}
        </FlexWrapper>

        <FlexWrapper>
          {data.error && <Messages>{data.error}</Messages>}
        </FlexWrapper>

        {!data.loading && !data.error && (
          <FlexWrapper>
            {data?.data?.assignments?.map((assignment) => (
              <AssignmentCard key={assignment.id} item={assignment} handleDownload={handleDownload} />
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