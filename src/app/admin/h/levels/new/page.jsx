'use client'
import { useState } from 'react'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextInputView } from '@/helpers';
import { useCreateResource } from '@/hooks';
import { PrimaryEditor } from '@/editor';

export default function NewLevel() {
    const [formData, setFormData] = useState({
        levelname: '',
    });

    const [levelDescription, setLevelDescription] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const editorInstanceHandler = (content, editor) => {
        setLevelDescription(content);
    }

    const { data: dataCreated, createResource } = useCreateResource('levels');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            levelname: formData.levelname,
            leveldescription: levelDescription,
        };
        createResource(newResource, '/admin/h/levels');
    };

  return (
    <ContainerWrapper>
        <HeaderActionView
            backLink="/admin/h/levels"
            backText="Levels"
            itemText="New Level"
        />
        {dataCreated.loading && <Spinner/>}
        {dataCreated.error && !dataCreated.loading && <Messages>{dataCreated.error}</Messages>}
        <NonFormWrapper>

            <FlexWrapper>
                <FlexItemWrapper width={`md:w-1/2`}>
                    <LabelView name={`Level Name`} forWhat={`levelname`} />
                    <TextInputView
                        id={`levelname`}
                        type={`text`}
                        name={`levelname`}
                        value={formData.levelname}
                        change={handleChange}
                        autoComplete={false}
                        placeholder={`Name of the level`}
                    />
                </FlexItemWrapper>
            </FlexWrapper>

            <FlexWrapper>
                <FlexItemWrapper width={`md:w-1/1`}>
                    <LabelView name={`Level Description`} forWhat={`levelDescription`} />
                    <PrimaryEditor 
                     editorInstanceHandler={editorInstanceHandler}
                     editorConfig={{
                        menubar: false,
                        selector: "levelDescription",
                        height: 300,
                      }}
                      initialValue="<p>A Short description of the level.</p>"
                    />
                </FlexItemWrapper>
            </FlexWrapper>

        
            <FooterActionView 
                handleSubmit={handleSubmit} 
                data={dataCreated}
                createText="Create Level"
            />

        </NonFormWrapper>
    </ContainerWrapper>
  )
}