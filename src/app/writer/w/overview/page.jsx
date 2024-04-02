'use client'
import { CardWrapper, ContainerWrapper, FlexItemWrapper, FlexItemWrapperExtended, FlexWrapper, NonFormWrapper, OverviewCard, SectionOverviewWrapper, TwoPartViewNoBar } from '@/helpers';
import { dashboard } from '@/assets';
import { useFetchResourceOne } from '@/hooks';

export default function CustomerOverview() {
  const { data: dataFetchedStats } = useFetchResourceOne('orders/worker-stats');

  return (
    <ContainerWrapper>
      <SectionOverviewWrapper>

        <FlexWrapper>
          <OverviewCard
            imageUrl={dashboard}
            title="Dashboard (c)"
          />
        </FlexWrapper>

        <FlexWrapper>
          <CardWrapper>
            <FlexItemWrapperExtended width={`md:w-1/1`}>
              <NonFormWrapper>
                {dataFetchedStats.data.orderVolume && (
                  <FlexItemWrapper width={`md:w-1/3`}>
                      <TwoPartViewNoBar 
                          title1={`Orders`}
                          title2={dataFetchedStats.data.orderVolume}
                      />
                  </FlexItemWrapper>
                )}
                {dataFetchedStats.data.orderStatusDistribution && dataFetchedStats.data.orderStatusDistribution.map((status, index) => (
                  <FlexItemWrapper key={index} width={`md:w-1/3`}>
                    <TwoPartViewNoBar 
                      title1={`${status.orderstatus.title}`}
                      title2={`${status.count}`}
                    />
                  </FlexItemWrapper>
                ))}

              </NonFormWrapper>
            </FlexItemWrapperExtended>
          </CardWrapper>
        </FlexWrapper>

      </SectionOverviewWrapper>
    </ContainerWrapper>
  );
}