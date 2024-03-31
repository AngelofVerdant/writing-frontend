'use client'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextAreaView, TextInputView } from '@/helpers';
import { useResourceSingle, useResourceUpdate } from '@/hooks';
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function EditPoint() {
    const { id } = useParams();

    const { data } = useResourceSingle('points', id);
    
    const [formData, setFormData] = useState({
        pointname: '',
        pointdescription: '',
    });

    useEffect(() => {
      if (data?.data) {
        setFormData({
          ...formData,
          pointname: data.data.pointname || '',
          pointdescription: data.data.pointdescription || '',
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

    const { data: dataUpdated, updateResource } = useResourceUpdate(`points`, id, formData, setFormData);

    const handleUpdate = async (e) => {
      e.preventDefault();
      const updateItem = {
        pointname: formData.pointname,
        pointdescription: formData.pointdescription,
      };
      updateResource(updateItem, '/admin/s/points');
    };
  

  return (
    <ContainerWrapper>
      <HeaderActionView
          backLink="/admin/s/points"
          backText="Points"
          itemText="Edit Point"
      />
      {dataUpdated.loading && <Spinner/>}
      {dataUpdated.error && !dataUpdated.loading && <Messages>{dataUpdated.error}</Messages>}
      <NonFormWrapper>
        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Point Name`} forWhat={`pointname`} />
                <TextInputView
                    id={`pointname`}
                    type={`text`}
                    name={`pointname`}
                    value={formData.pointname}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`Name of the Point`}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/1`}>
                <LabelView name={`Point Description`} forWhat={`pointdescription`} />
                <TextAreaView
                    id={`pointdescription`}
                    name={`pointdescription`}
                    value={formData.pointdescription}
                    change={handleChange}
                    rows={6}
                    maxLength={200}
                    minLength={30}
                    autoComplete={false}
                    preventDefaultPaste={false}
                    placeholder={`Description of the point`}
                />
            </FlexItemWrapper>
        </FlexWrapper>

        <FooterActionView 
            handleSubmit={handleUpdate} 
            data={dataUpdated}
            createText="Update Point"
        />

      </NonFormWrapper>
    </ContainerWrapper>
  )
}