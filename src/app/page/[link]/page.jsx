'use client'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, Messages, NonFormWrapper, Spinner} from '@/helpers';
import { useResourceLink } from '@/hooks';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SinglePage() {
    const { link } = useParams();

    const { data } = useResourceLink('pages/slug', link);
    
    const [formData, setFormData] = useState({
        pagename: '',
        pagedescription: ''
    });

    useEffect(() => {
      if (data?.data) {
        setFormData({
          ...formData,
          pagename: data.data.pagename || '',
          pagedescription: data.data.pagedescription || ''
        });
      }
    }, [data]);

  return (
    <ContainerWrapper>
        <NonFormWrapper>

            {data.loading && <Spinner/>}
            {data.error && !data.loading && <Messages>{data.error}</Messages>}
            <FlexWrapper>
                <FlexItemWrapper width={`md:w-2/3`}>
                    <article class="prose-neutral lg:prose-xl">
                        {!data.loading && !data.error && (
                            <h1>{formData.pagename}</h1>
                        )}
                        {!data.loading && !data.error && (
                            <div dangerouslySetInnerHTML={{ __html: formData.pagedescription }} />
                        )}
                    </article>
                </FlexItemWrapper>
            </FlexWrapper>

        </NonFormWrapper>
    </ContainerWrapper>
  )
}