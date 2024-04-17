'use client'
import { PrimaryEditor } from '@/editor';
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextInputView } from '@/helpers';
import { useResourceSingle, useResourceUpdate } from '@/hooks';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function EditPage() {
    const { id } = useParams();

    const { data } = useResourceSingle('pages', id);
    
    const [formData, setFormData] = useState({
        pagename: '',
        initialContent: ''
    });
    
    const [postDescription, setPostDescription] = useState('');

    useEffect(() => {
      if (data?.data) {
        setFormData({
          ...formData,
          pagename: data.data.pagename || '',
          initialContent: data.data.pagedescription || ''
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
      setPostDescription(content);
    }

    const { data: dataUpdated, updateResource } = useResourceUpdate(`pages`, id, formData, setFormData);

    const handleUpdate = async (e) => {
      e.preventDefault();
      const updateItem = {
        pagename: formData.pagename,
        pagedescription: postDescription,
      };
      updateResource(updateItem, '/admin/s/pages');
    };
  

  return (
    <ContainerWrapper>
      <HeaderActionView
          backLink="/admin/s/pages"
          backText="Pages"
          itemText="Edit Page"
      />
      {dataUpdated.loading && <Spinner/>}
      {dataUpdated.error && !dataUpdated.loading && <Messages>{dataUpdated.error}</Messages>}
      <NonFormWrapper>
        <FlexWrapper>
          <FlexItemWrapper width={`md:w-1/2`}>
              <LabelView name={`Page Name`} forWhat={`pagename`} />
              <TextInputView
                  id={`pagename`}
                  type={`text`}
                  name={`pagename`}
                  value={formData.pagename}
                  change={handleChange}
                  autoComplete={false}
                  placeholder={`Name of the Page`}
              />
          </FlexItemWrapper>
        </FlexWrapper>

        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/1`}>
                <LabelView name={`Page Description`} forWhat={`pagedescription`} />
                <PrimaryEditor 
                  editorInstanceHandler={editorInstanceHandler}
                  editorConfig={{
                    menubar: false,
                    selector: "pagedescription",
                    height: 300,
                  }}
                  initialValue={formData.initialContent}
                />
            </FlexItemWrapper>
        </FlexWrapper>

        <FooterActionView 
            handleSubmit={handleUpdate} 
            data={dataUpdated}
            createText="Update Page"
        />

      </NonFormWrapper>
    </ContainerWrapper>
  )
}