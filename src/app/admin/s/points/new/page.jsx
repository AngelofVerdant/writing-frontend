'use client'
import { useState } from 'react'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextAreaView, TextInputView } from '@/helpers';
import { useCreateResource } from '@/hooks';

export default function NewPoint() {
    const [formData, setFormData] = useState({
        pointname: '',
        pointdescription: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const { data: dataCreated, createResource } = useCreateResource('points');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            pointname: formData.pointname,
            pointdescription: formData.pointdescription,
        };
        createResource(newResource, '/admin/s/points');
    };

  return (
    <ContainerWrapper>
        <HeaderActionView
            backLink="/admin/s/points"
            backText="Points"
            itemText="New Point"
        />
        {dataCreated.loading && <Spinner/>}
        {dataCreated.error && !dataCreated.loading && <Messages>{dataCreated.error}</Messages>}
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
                handleSubmit={handleSubmit} 
                data={dataCreated}
                createText="Create Point"
            />

        </NonFormWrapper>
    </ContainerWrapper>
  )
}