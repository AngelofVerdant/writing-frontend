'use client'
import { useState, useEffect } from 'react'
import { CheckView, ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextInputView } from '@/helpers';
import { useCheckbox, useCreateResource, useFetchResource } from '@/hooks';
import { PrimaryEditor } from '@/editor';

export default function NewPaper() {
    const [formData, setFormData] = useState({
        papername: '',
    });

    const [paperDescription, setPaperDescription] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const editorInstanceHandler = (content, editor) => {
        setPaperDescription(content);
    }

    const [levels, setLevels] = useState([]);
    const { data: dataFetchedLevels } = useFetchResource('levels/all');
    
    useEffect(() => {
        if (dataFetchedLevels.success) {
          setLevels(dataFetchedLevels.data.levels);
        }
    }, [dataFetchedLevels]);
  
    const [levelItems, levelBoxes, handleSelectAllLevels, clearAllLevels] = useCheckbox(levels, 'md:w-1/4');

    const { data: dataCreated, createResource } = useCreateResource('papers');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            papername: formData.papername,
            paperdescription: paperDescription,
            level_ids: levelItems,
        };
        createResource(newResource, '/admin/h/papers');
    };

  return (
    <ContainerWrapper>
        <HeaderActionView
            backLink="/admin/h/papers"
            backText="Papers"
            itemText="New Paper"
        />
        {dataCreated.loading && <Spinner/>}
        {dataCreated.error && !dataCreated.loading && <Messages>{dataCreated.error}</Messages>}
        <NonFormWrapper>

            <FlexWrapper>
                <FlexItemWrapper width={`md:w-1/2`}>
                    <LabelView name={`Paper Name`} forWhat={`papername`} />
                    <TextInputView
                        id={`papername`}
                        type={`text`}
                        name={`papername`}
                        value={formData.papername}
                        change={handleChange}
                        autoComplete={false}
                        placeholder={`Name of the paper`}
                    />
                </FlexItemWrapper>
            </FlexWrapper>

            <FlexWrapper>
                <FlexItemWrapper width={`md:w-1/1`}>
                    <LabelView name={`Paper Description`} forWhat={`paperDescription`} />
                    <PrimaryEditor 
                     editorInstanceHandler={editorInstanceHandler}
                     editorConfig={{
                        menubar: false,
                        selector: "paperDescription",
                        height: 300,
                      }}
                      initialValue="<p>A Short description of the paper.</p>"
                    />
                </FlexItemWrapper>
            </FlexWrapper>

            <FlexWrapper>
                <FlexItemWrapper width={`md:w-1/1`}>
                    {dataFetchedLevels.loading && <Spinner />}
                    {dataFetchedLevels.error && <Messages>{dataFetchedLevels.error}</Messages>}
                    {!dataFetchedLevels.loading && !dataFetchedLevels.error && (
                        <CheckView
                            title={`Levels`}
                            label={`levels`} 
                            data={levelBoxes}
                            handleSelectAll={handleSelectAllLevels}
                            allSelected = {levelItems}
                        />
                    )}
                </FlexItemWrapper>
            </FlexWrapper>

            <FooterActionView 
                handleSubmit={handleSubmit} 
                data={dataCreated}
                createText="Create Paper"
            />

        </NonFormWrapper>
    </ContainerWrapper>
  )
}