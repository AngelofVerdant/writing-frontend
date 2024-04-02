'use client'
import { useState } from 'react'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextInputView } from '@/helpers';
import { useCreateResource } from '@/hooks';
import { PrimaryEditor } from '@/editor';

export default function NewPost() {
    const [formData, setFormData] = useState({
        postname: '',
    });

    const [postDescription, setPostDescription] = useState('');

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

    const { data: dataCreated, createResource } = useCreateResource('posts');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            postname: formData.postname,
            postdescription: postDescription,
        };
        createResource(newResource, '/admin/p/posts');
    };

  return (
    <ContainerWrapper>
        <HeaderActionView
            backLink="/admin/p/posts"
            backText="Posts"
            itemText="New Post"
        />
        {dataCreated.loading && <Spinner/>}
        {dataCreated.error && !dataCreated.loading && <Messages>{dataCreated.error}</Messages>}
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
                    <LabelView name={`Post Description`} forWhat={`postDescription`} />
                    <PrimaryEditor 
                     editorInstanceHandler={editorInstanceHandler}
                     editorConfig={{
                        menubar: false,
                        selector: "postDescription",
                        height: 300,
                      }}
                      initialValue="<p>A Short description of the post.</p>"
                    />
                </FlexItemWrapper>
            </FlexWrapper>

        
            <FooterActionView 
                handleSubmit={handleSubmit} 
                data={dataCreated}
                createText="Create Post"
            />

        </NonFormWrapper>
    </ContainerWrapper>
  )
}