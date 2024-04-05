'use client'
import { useEffect, useState } from 'react';
import { FlexItemWrapper, FlexWrapper, MediaUpload } from '@/helpers';
import { useUploadMedia } from '@/hooks';
import { MediaModal } from '@/modals';

export default function DocumentStep({ stepIndex, stepperProps, stepData, setDocumentStepValid }) {
    const { setStepInputData } = stepperProps;
    const { paperimages, paperdefaultimage } = stepData[stepIndex] || {};

    const handleStepperInput = (fieldName, value) => {
        const updatedStepData = [...stepData];
        updatedStepData[stepIndex][fieldName] = value;
        setStepInputData(updatedStepData);
    };

    const [limit, setLimit] = useState(20);
    const {
        fileInputRef,
        data: dataUploaded,
        defaultImage,
        images,
        setDefaultImage,
        setImages,
        handleFileInputChange,
        handleIconClick,
        isUploadDisabled,
    } = useUploadMedia(limit, 'order-documents');

    const [showModal, setShowModal] = useState(false);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    useEffect(() => {
        handleStepperInput('paperimages', images);
    }, [images, handleStepperInput]);

    useEffect(() => {
        handleStepperInput('paperdefaultimage', defaultImage);
    }, [defaultImage, handleStepperInput]);

    const [validations, setValidations] = useState({
        paperimages: true,
        paperdefaultimage: true,
    });

    const validateInputs = () => {
        const newValidations = {
            paperimages: images.length > 0,
            paperdefaultimage: !!defaultImage,
        };

        setValidations(newValidations);

        const allInputsValid = Object.values(newValidations).every((isValid) => isValid);
        setDocumentStepValid(allInputsValid);
    };

    useEffect(() => {
        validateInputs();
    }, [paperimages, paperdefaultimage, validateInputs]);

    return (
        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <MediaUpload
                    handleFileInputChange={handleFileInputChange}
                    isUploadDisabled={isUploadDisabled}
                    dataUploaded={dataUploaded}
                    handleIconClick={handleIconClick}
                    handleModalOpen={handleModalOpen}
                    fileInputRef={fileInputRef}
                    defaultImage={defaultImage}
                    iconText={`Max Images (${limit})`}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/1`}>
                <MediaModal
                    id="media"
                    setDefaultImage={setDefaultImage}
                    setImages={setImages}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    images={images}
                    defaultImage={defaultImage}
                />
            </FlexItemWrapper>
        </FlexWrapper>
    );
}
