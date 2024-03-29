'use client'
import { useState, useEffect } from 'react'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, RadioView, Spinner, TextInputView } from '@/helpers';
import { useCreateResource, useFetchResource, useRadio } from '@/hooks';
import { PrimaryEditor } from '@/editor';

export default function NewPaperType() {
    const [formData, setFormData] = useState({
        papertypename: '',
        priceperpage: '',
    });

    const [papertypeDescription, setPaperTypeDescription] = useState('');

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

    const [papers, setPapers] = useState([]);
    const { data: dataFetchedPapers } = useFetchResource('papers/all');
    
    useEffect(() => {
        if (dataFetchedPapers.success) {
          setPapers(dataFetchedPapers.data.papers);
        }
    }, [dataFetchedPapers]);    
  
    const [selectedId, radios] = useRadio(papers, 'md:w-1/4');

    const { data: dataCreated, createResource } = useCreateResource('paper-types');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            papertypename: formData.papertypename,
            papertypedescription: papertypeDescription,
            priceperpage: parseFloat(formData.priceperpage),
            paper_id: selectedId,
        };
        createResource(newResource, '/admin/h/paper-types');
    };

  return (
    <ContainerWrapper>
        <HeaderActionView
            backLink="/admin/h/paper-types"
            backText="Paper Types"
            itemText="New Paper Type"
        />
        {dataCreated.loading && <Spinner/>}
        {dataCreated.error && !dataCreated.loading && <Messages>{dataCreated.error}</Messages>}
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
                        placeholder={`Name of the paper type`}
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
                    <LabelView name={`Paper Type Description`} forWhat={`papertypeDescription`} />
                    <PrimaryEditor 
                     editorInstanceHandler={editorInstanceHandler}
                     editorConfig={{
                        menubar: false,
                        selector: "papertypeDescription",
                        height: 300,
                      }}
                      initialValue="<p>A Short description of the paper type.</p>"
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
                handleSubmit={handleSubmit} 
                data={dataCreated}
                createText="Create Paper Type"
            />

        </NonFormWrapper>
    </ContainerWrapper>
  )
}