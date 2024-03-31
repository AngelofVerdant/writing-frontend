'use client'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextInputView } from '@/helpers';
import { useFetchResourceOne, useResourceUpdateOne } from '@/hooks';
import React, { useState, useEffect } from 'react'

export default function Achievements() {
    const { data } = useFetchResourceOne('achievements');
    
    const [formData, setFormData] = useState({
        orderscompleted: '',
        satisfiedclients: '',
        positivefeedbacks: '',
        freebiesreleased: '',
    });

    useEffect(() => {
      if (data?.data) {
        setFormData({
          ...formData,
          orderscompleted: data.data.orderscompleted || '',
          satisfiedclients: data.data.satisfiedclients || '',
          positivefeedbacks: data.data.positivefeedbacks || '',
          freebiesreleased: data.data.freebiesreleased || '',
        });
      }
    }, [data]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const { data: dataUpdated, updateResource } = useResourceUpdateOne(`achievements`, formData, setFormData);

    const handleUpdate = async (e) => {
      e.preventDefault();
      const updateItem = {
        orderscompleted: formData.orderscompleted,
        satisfiedclients: formData.satisfiedclients,
        positivefeedbacks: formData.positivefeedbacks,
        freebiesreleased: formData.freebiesreleased,
      };
      updateResource(updateItem, '/admin/h/overview');
    };
  

  return (
    <ContainerWrapper>
      <HeaderActionView
          backLink="/admin/h/overview"
          backText="Overview"
          itemText="Achievements"
      />
      {dataUpdated.loading && <Spinner/>}
      {dataUpdated.error && !dataUpdated.loading && <Messages>{dataUpdated.error}</Messages>}
      <NonFormWrapper>
        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Orders Completed`} forWhat={`orderscompleted`} />
                <TextInputView
                    id={`orderscompleted`}
                    type={`number`}
                    name={`orderscompleted`}
                    value={formData.orderscompleted}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`0`}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Satisfied Clients`} forWhat={`satisfiedclients`} />
                <TextInputView
                    id={`satisfiedclients`}
                    type={`number`}
                    name={`satisfiedclients`}
                    value={formData.satisfiedclients}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`0`}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Positive Feedbacks`} forWhat={`positivefeedbacks`} />
                <TextInputView
                    id={`positivefeedbacks`}
                    type={`number`}
                    name={`positivefeedbacks`}
                    value={formData.positivefeedbacks}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`0`}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Freebies Released`} forWhat={`freebiesreleased`} />
                <TextInputView
                    id={`freebiesreleased`}
                    type={`number`}
                    name={`freebiesreleased`}
                    value={formData.freebiesreleased}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`0`}
                />
            </FlexItemWrapper>
        </FlexWrapper>

        <FooterActionView 
            handleSubmit={handleUpdate} 
            data={dataUpdated}
            createText="Save"
        />

      </NonFormWrapper>
    </ContainerWrapper>
  )
}