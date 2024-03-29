'use client'
import { ContainerWrapper, FlexWrapper, OverviewCard, SectionOverviewWrapper } from '@/helpers';
import { users } from '@/assets';

export default function AdminOverview() {

  return (
    <ContainerWrapper>
      <SectionOverviewWrapper>

        <FlexWrapper>
          <OverviewCard
            imageUrl={users}
            title="Admin Overview Dashboard"
            description="Overview of the admin dashboard"
          />
        </FlexWrapper>

      </SectionOverviewWrapper>
    </ContainerWrapper>
  );
}