'use client'
import { PrimaryEditor } from '@/editor';
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, RadioView, Spinner, TextInputView } from '@/helpers';
import { useFetchResource, useRadio, useResourceSingle, useResourceUpdate } from '@/hooks';
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function EditPaperType() {
    const { id } = useParams();

    const { data } = useResourceSingle('paper-types', id);
    
    const [formData, setFormData] = useState({
        papertypename: '',
        preselectedpaper: '',
        initialContent: ''
    });
    
    const [paperTypeDescription, setPaperTypeDescription] = useState('');

    useEffect(() => {
      if (data?.data) {
        setFormData({
          ...formData,
          papertypename: data.data.papertypename || '',
          preselectedpaper: data.data.paper_id || null,
          initialContent: data.data.papertypedescription || ''
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
      setPaperTypeDescription(content);
    }

    const { data: dataFetchedPapers } = useFetchResource('papers/all');
    const [papers, setPapers] = useState([]);
    useEffect(() => {
      if (dataFetchedPapers.success) {
        setPapers(dataFetchedPapers.data.papers);
      }
    }, [dataFetchedPapers]);
    
    const [selectedId, radios] = useRadio(papers, 'md:w-1/4', formData.preselectedpaper);

    const { data: dataUpdated, updateResource } = useResourceUpdate(`paper-types`, id, formData, setFormData);

    const handleUpdate = async (e) => {
      e.preventDefault();
      const updateItem = {
        papertypename: formData.papertypename,
        papertypedescription: paperTypeDescription,
        paper_id: selectedId,
      };
      updateResource(updateItem, '/admin/h/paper-types');
    };
  

  return (
    <ContainerWrapper>
      <HeaderActionView
          backLink="/admin/h/paper-types"
          backText="Paper Types"
          itemText="Edit Paper Type"
      />
      {dataUpdated.loading && <Spinner/>}
      {dataUpdated.error && !dataUpdated.loading && <Messages>{dataUpdated.error}</Messages>}
      <NonFormWrapper>
        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Paper Type Name`} forWhat={`papertypename`} />
                <TextInputView
                    id={`papertypename`}
                    type={`text`}
                    name={`papertypename`}
                    value={formData.papertypename}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`Name of the Paper Type`}
                />
            </FlexItemWrapper>
        </FlexWrapper>

        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/1`}>
                <LabelView name={`Paper Type Description`} forWhat={`paperdescription`} />
                <PrimaryEditor 
                  editorInstanceHandler={editorInstanceHandler}
                  editorConfig={{
                    menubar: false,
                    selector: "paperdescription",
                    height: 300,
                  }}
                  initialValue={formData.initialContent}
                />
            </FlexItemWrapper>
        </FlexWrapper>

        <FlexWrapper>
          <FlexItemWrapper width={`md:w-1/1`}>
              {dataFetchedPapers.loading && <Spinner />}
              {dataFetchedPapers.error && <Messages>{dataFetchedPapers.error}</Messages>}
              {!dataFetchedPapers.loading && !dataFetchedPapers.error && (
                  <RadioView title={`Paper`} label={`paper`} data={radios}/>
              )}
          </FlexItemWrapper>
        </FlexWrapper>

        <FooterActionView 
            handleSubmit={handleUpdate} 
            data={dataUpdated}
            createText="Update Paper Type"
        />

      </NonFormWrapper>
    </ContainerWrapper>
  )
}