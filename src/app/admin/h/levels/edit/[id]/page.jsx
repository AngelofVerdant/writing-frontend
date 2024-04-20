'use client'
import { PrimaryEditor } from '@/editor';
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextInputView } from '@/helpers';
import { useResourceSingle, useResourceUpdate } from '@/hooks';
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function EditLevel() {
    const { id } = useParams();

    const { data } = useResourceSingle('levels', id);
    
    const [formData, setFormData] = useState({
        levelname: '',
        priceperpage: '',
        initialContent: ''
    });
    
    const [levelDescription, setLevelDescription] = useState('');

    useEffect(() => {
      if (data?.data) {
        setFormData({
          ...formData,
          levelname: data.data.levelname || '',
          priceperpage: data.data.priceperpage || '',
          initialContent: data.data.leveldescription || ''
        });
        editorInstanceHandler();
      }
    }, [data]);

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

    const { data: dataUpdated, updateResource } = useResourceUpdate(`levels`, id, formData, setFormData);

    const handleUpdate = async (e) => {
      e.preventDefault();
      const updateItem = {
        levelname: formData.levelname,
        priceperpage: parseFloat(formData.priceperpage),
        leveldescription: levelDescription,
      };
      updateResource(updateItem, '/admin/h/levels');
    };
  

  return (
    <ContainerWrapper>
      <HeaderActionView
          backLink="/admin/h/levels"
          backText="Levels"
          itemText="Edit Level"
      />
      {dataUpdated.loading && <Spinner/>}
      {dataUpdated.error && !dataUpdated.loading && <Messages>{dataUpdated.error}</Messages>}
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
                    placeholder={`Name of the Level`}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/4`}>
                <LabelView name={`Price Per Page`} forWhat={`priceperpage`} />
                <TextInputView
                    id={`priceperpage`}
                    type={`number`}
                    name={`priceperpage`}
                    value={formData.priceperpage}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`0`}
                />
            </FlexItemWrapper>
        </FlexWrapper>

        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/1`}>
                <LabelView name={`Level Description`} forWhat={`leveldescription`} />
                <PrimaryEditor 
                  editorInstanceHandler={editorInstanceHandler}
                  editorConfig={{
                    menubar: false,
                    selector: "leveldescription",
                    height: 300,
                  }}
                  initialValue={formData.initialContent}
                />
            </FlexItemWrapper>
        </FlexWrapper>

        <FooterActionView 
            handleSubmit={handleUpdate} 
            data={dataUpdated}
            createText="Update Level"
        />

      </NonFormWrapper>
    </ContainerWrapper>
  )
}