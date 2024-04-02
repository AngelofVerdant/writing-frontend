'use client'
import { PrimaryEditor } from '@/editor';
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextInputView } from '@/helpers';
import { useResourceSingle, useResourceUpdate } from '@/hooks';
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function EditPost() {
    const { id } = useParams();

    const { data } = useResourceSingle('posts', id);
    
    const [formData, setFormData] = useState({
        postname: '',
        initialContent: ''
    });
    
    const [postDescription, setPostDescription] = useState('');

    useEffect(() => {
      if (data?.data) {
        setFormData({
          ...formData,
          postname: data.data.postname || '',
          initialContent: data.data.postdescription || ''
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

    const { data: dataUpdated, updateResource } = useResourceUpdate(`posts`, id, formData, setFormData);

    const handleUpdate = async (e) => {
      e.preventDefault();
      const updateItem = {
        postname: formData.postname,
        postdescription: postDescription,
      };
      updateResource(updateItem, '/admin/p/posts');
    };
  

  return (
    <ContainerWrapper>
      <HeaderActionView
          backLink="/admin/p/posts"
          backText="Posts"
          itemText="Edit Post"
      />
      {dataUpdated.loading && <Spinner/>}
      {dataUpdated.error && !dataUpdated.loading && <Messages>{dataUpdated.error}</Messages>}
      <NonFormWrapper>
        <FlexWrapper>
          <FlexItemWrapper width={`md:w-1/2`}>
              <LabelView name={`Post Name`} forWhat={`postname`} />
              <TextInputView
                  id={`postname`}
                  type={`text`}
                  name={`postname`}
                  value={formData.postname}
                  change={handleChange}
                  autoComplete={false}
                  placeholder={`Name of the Post`}
              />
          </FlexItemWrapper>
        </FlexWrapper>

        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/1`}>
                <LabelView name={`Post Description`} forWhat={`postdescription`} />
                <PrimaryEditor 
                  editorInstanceHandler={editorInstanceHandler}
                  editorConfig={{
                    menubar: false,
                    selector: "postdescription",
                    height: 300,
                  }}
                  initialValue={formData.initialContent}
                />
            </FlexItemWrapper>
        </FlexWrapper>

        <FooterActionView 
            handleSubmit={handleUpdate} 
            data={dataUpdated}
            createText="Update Post"
        />

      </NonFormWrapper>
    </ContainerWrapper>
  )
}