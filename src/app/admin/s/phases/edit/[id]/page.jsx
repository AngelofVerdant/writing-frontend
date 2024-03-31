'use client'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextAreaView, TextInputView } from '@/helpers';
import { useResourceSingle, useResourceUpdate } from '@/hooks';
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function EditPhase() {
    const { id } = useParams();

    const { data } = useResourceSingle('phases', id);
    
    const [formData, setFormData] = useState({
        phasename: '',
        phasedescription: '',
    });

    useEffect(() => {
      if (data?.data) {
        setFormData({
          ...formData,
          phasename: data.data.phasename || '',
          phasedescription: data.data.phasedescription || '',
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

    const { data: dataUpdated, updateResource } = useResourceUpdate(`phases`, id, formData, setFormData);

    const handleUpdate = async (e) => {
      e.preventDefault();
      const updateItem = {
        phasename: formData.phasename,
        phasedescription: formData.phasedescription,
      };
      updateResource(updateItem, '/admin/s/phases');
    };
  

  return (
    <ContainerWrapper>
      <HeaderActionView
          backLink="/admin/s/phases"
          backText="Phases"
          itemText="Edit Phase"
      />
      {dataUpdated.loading && <Spinner/>}
      {dataUpdated.error && !dataUpdated.loading && <Messages>{dataUpdated.error}</Messages>}
      <NonFormWrapper>
        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Phase Name`} forWhat={`phasename`} />
                <TextInputView
                    id={`phasename`}
                    type={`text`}
                    name={`phasename`}
                    value={formData.phasename}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`Name of the Phase`}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/1`}>
                <LabelView name={`Phase Description`} forWhat={`phasedescription`} />
                <TextAreaView
                    id={`phasedescription`}
                    name={`phasedescription`}
                    value={formData.phasedescription}
                    change={handleChange}
                    rows={6}
                    maxLength={200}
                    minLength={30}
                    autoComplete={false}
                    preventDefaultPaste={false}
                    placeholder={`Description of the phase`}
                />
            </FlexItemWrapper>
        </FlexWrapper>

        <FooterActionView 
            handleSubmit={handleUpdate} 
            data={dataUpdated}
            createText="Update Phase"
        />

      </NonFormWrapper>
    </ContainerWrapper>
  )
}