'use client'
import { useState } from 'react'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextInputView } from '@/helpers';
import { useCreateResource } from '@/hooks';
import { PrimaryEditor } from '@/editor';

export default function NewPage() {
    const [formData, setFormData] = useState({
        pagename: '',
    });

    const [pageDescription, setPageDescription] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const editorInstanceHandler = (content, editor) => {
        setPageDescription(content);
    }

    const { data: dataCreated, createResource } = useCreateResource('pages');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            pagename: formData.pagename,
            pagedescription: pageDescription,
        };
        createResource(newResource, '/admin/s/pages');
    };

  return (
    <ContainerWrapper>
        <HeaderActionView
            backLink="/admin/s/pages"
            backText="Pages"
            itemText="New Page"
        />
        {dataCreated.loading && <Spinner/>}
        {dataCreated.error && !dataCreated.loading && <Messages>{dataCreated.error}</Messages>}
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
                    <LabelView name={`Page Description`} forWhat={`pageDescription`} />
                    <PrimaryEditor 
                     editorInstanceHandler={editorInstanceHandler}
                     editorConfig={{
                        menubar: false,
                        selector: "pageDescription",
                        height: 300,
                      }}
                      initialValue="<p>A Short description of the page.</p>"
                    />
                </FlexItemWrapper>
            </FlexWrapper>

        
            <FooterActionView 
                handleSubmit={handleSubmit} 
                data={dataCreated}
                createText="Create Page"
            />

        </NonFormWrapper>
    </ContainerWrapper>
  )
}