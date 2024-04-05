'use client'
import React, { useEffect, useState } from 'react';
import { DocumentUpload, FlexItemWrapper, FlexWrapper } from '@/helpers';
import { useUploadDocument } from '@/hooks';
import { DocumentModal } from '@/modals';

export default function DocumentStep({ stepIndex, stepperProps, stepData, setDocumentStepValid }) {
    const { setStepInputData } = stepperProps;
    const { paperdocuments, paperdefaultdocument } = stepData[stepIndex] || {};

    const handleStepperInput = (fieldName, value) => {
        const updatedStepData = [...stepData];
        updatedStepData[stepIndex][fieldName] = value;
        setStepInputData(updatedStepData);
    };

    const [limit, setLimit] = useState(10);
    const {
        fileInputRef,
        data: dataUploaded,
        documents,
        defaultDocument,
        setDefaultDocument,
        setDocuments,
        handleFileInputChange,
        handleIconClick,
        isUploadDisabled,
    } = useUploadDocument(limit, 'order-documents');

    const [showModal, setShowModal] = useState(false);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const [validations, setValidations] = useState({
        paperdocuments: true,
        paperdefaultdocument: true,
    });

    const validateInputs = () => {
        const newValidations = {
            paperdocuments: documents.length > 0,
            paperdefaultdocument: !!defaultDocument,
        };

        setValidations(newValidations);

        const allInputsValid = Object.values(newValidations).every((isValid) => isValid);
        setDocumentStepValid(allInputsValid);
    };

    useEffect(() => {
        handleStepperInput('paperdocuments', documents);
    }, [documents]);
    
    useEffect(() => {
        handleStepperInput('paperdefaultdocument', defaultDocument);
    }, [defaultDocument]);
    
    useEffect(() => {
        validateInputs();
    }, [documents, defaultDocument]);
    

    return (
        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <DocumentUpload
                    handleFileInputChange={handleFileInputChange}
                    isUploadDisabled={isUploadDisabled}
                    dataUploaded={dataUploaded}
                    handleIconClick={handleIconClick}
                    fileInputRef={fileInputRef}
                    handleModalOpen={handleModalOpen}
                    defaultDocument={defaultDocument}
                    iconText={`Max Images (${limit})`}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/1`}>
                <DocumentModal
                    showModal={showModal}  
                    setShowModal={setShowModal}
                    documents={documents}
                    setDocuments={setDocuments}
                    defaultDocument={defaultDocument}
                    setDefaultDocument={setDefaultDocument}
                />
            </FlexItemWrapper>
        </FlexWrapper>
    );
}