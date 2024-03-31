'use client'
import { useState } from 'react'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextAreaView, TextInputView } from '@/helpers';
import { useCreateResource } from '@/hooks';

export default function NewPhase() {
    const [formData, setFormData] = useState({
        phasename: '',
        phasedescription: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const { data: dataCreated, createResource } = useCreateResource('phases');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            phasename: formData.phasename,
            phasedescription: formData.phasedescription,
        };
        createResource(newResource, '/admin/s/phases');
    };

  return (
    <ContainerWrapper>
        <HeaderActionView
            backLink="/admin/s/phases"
            backText="Phases"
            itemText="New Phase"
        />
        {dataCreated.loading && <Spinner/>}
        {dataCreated.error && !dataCreated.loading && <Messages>{dataCreated.error}</Messages>}
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
                        placeholder={`Description of the essay`}
                    />
                </FlexItemWrapper>
            </FlexWrapper>

            <FooterActionView 
                handleSubmit={handleSubmit} 
                data={dataCreated}
                createText="Create Phase"
            />

        </NonFormWrapper>
    </ContainerWrapper>
  )
}