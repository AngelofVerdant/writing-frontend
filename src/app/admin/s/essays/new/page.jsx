'use client'
import { useState } from 'react'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextAreaView, TextInputView } from '@/helpers';
import { useCreateResource } from '@/hooks';

export default function NewEssay() {
    const [formData, setFormData] = useState({
        essayname: '',
        essaydescription: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const { data: dataCreated, createResource } = useCreateResource('essays');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            essayname: formData.essayname,
            essaydescription: formData.essaydescription,
        };
        createResource(newResource, '/admin/s/essays');
    };

  return (
    <ContainerWrapper>
        <HeaderActionView
            backLink="/admin/s/essays"
            backText="Essays"
            itemText="New Essay"
        />
        {dataCreated.loading && <Spinner/>}
        {dataCreated.error && !dataCreated.loading && <Messages>{dataCreated.error}</Messages>}
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
                handleSubmit={handleSubmit} 
                data={dataCreated}
                createText="Create Essay"
            />

        </NonFormWrapper>
    </ContainerWrapper>
  )
}