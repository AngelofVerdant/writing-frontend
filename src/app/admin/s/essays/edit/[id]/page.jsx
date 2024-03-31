'use client'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextAreaView, TextInputView } from '@/helpers';
import { useResourceSingle, useResourceUpdate } from '@/hooks';
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function EditEssay() {
    const { id } = useParams();

    const { data } = useResourceSingle('essays', id);
    
    const [formData, setFormData] = useState({
        essayname: '',
        essaydescription: '',
    });

    useEffect(() => {
      if (data?.data) {
        setFormData({
          ...formData,
          essayname: data.data.essayname || '',
          essaydescription: data.data.essaydescription || '',
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

    const { data: dataUpdated, updateResource } = useResourceUpdate(`essays`, id, formData, setFormData);

    const handleUpdate = async (e) => {
      e.preventDefault();
      const updateItem = {
        essayname: formData.essayname,
        essaydescription: formData.essaydescription,
      };
      updateResource(updateItem, '/admin/s/essays');
    };
  

  return (
    <ContainerWrapper>
      <HeaderActionView
          backLink="/admin/s/essays"
          backText="Essays"
          itemText="Edit Essay"
      />
      {dataUpdated.loading && <Spinner/>}
      {dataUpdated.error && !dataUpdated.loading && <Messages>{dataUpdated.error}</Messages>}
      <NonFormWrapper>
        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Essay Name`} forWhat={`essayname`} />
                <TextInputView
                    id={`essayname`}
                    type={`text`}
                    name={`essayname`}
                    value={formData.essayname}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`Name of the Essay`}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/1`}>
                <LabelView name={`Essay Description`} forWhat={`essaydescription`} />
                <TextAreaView
                    id={`essaydescription`}
                    name={`essaydescription`}
                    value={formData.essaydescription}
                    change={handleChange}
                    rows={6}
                    maxLength={200}
                    minLength={30}
                    autoComplete={false}
                    preventDefaultPaste={false}
                    placeholder={`Description of the essay`}
                />
            </FlexItemWrapper>
        </FlexWrapper>

        <FooterActionView 
            handleSubmit={handleUpdate} 
            data={dataUpdated}
            createText="Update Essay"
        />

      </NonFormWrapper>
    </ContainerWrapper>
  )
}