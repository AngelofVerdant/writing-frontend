'use client'
import { ContainerWrapper, FlexWrapper, OverviewCard, SectionOverviewWrapper } from '@/helpers';
import { users } from '@/assets';

export default function UserOverview() {

  return (
    <ContainerWrapper>
      <SectionOverviewWrapper>

        <FlexWrapper>
          <OverviewCard
            imageUrl={users}
            title="User Overview Dashboard"
            description="Overview of the user dashboard"
          />
        </FlexWrapper>

      </SectionOverviewWrapper>
    </ContainerWrapper>
  );
}