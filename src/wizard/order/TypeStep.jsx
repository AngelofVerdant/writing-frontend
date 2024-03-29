'use client'
import { useEffect, useState } from 'react'
import { FlexItemWrapper, FlexWrapper, Messages, RadioView, Spinner } from '@/helpers';
import { useRadioObject, useResourceSingle } from '@/hooks';

export default function TypeStep({ stepIndex, stepperProps, stepData, setTypeStepValid  }) {
    const { setStepInputData } = stepperProps;
    const { papertype } = stepData[stepIndex] || {};

    const { paper } = stepData[1] || {};

    const handleStepperInput = (fieldName, value) => {
      setStepInputData(stepIndex, { ...stepData[stepIndex], [fieldName]: value });
    };

    const { data: dataFetchedPaperTypes } = useResourceSingle('papers/papertypes', paper.id);

    const [papertypes, setPaperTypes] = useState([]);
    useEffect(() => {
      if (dataFetchedPaperTypes.success) {
        setPaperTypes(dataFetchedPaperTypes.data.papertypes);
      }
    }, [dataFetchedPaperTypes]);
    const [selectedpapertype, papertyperadios] = useRadioObject(papertypes, 'md:w-1/2');


    useEffect(() => {
      handleStepperInput('papertype', selectedpapertype);
    }, [selectedpapertype]);

    const [validations, setValidations] = useState({
        papertype: true,
    });

    const validateInputs = () => {
        const newValidations = {
            papertype: !!papertype,
        };

        setValidations(newValidations);

        const allInputsValid = Object.values(newValidations).every((isValid) => isValid);
        setTypeStepValid(allInputsValid);
    };

    useEffect(() => {
        validateInputs();
    }, [papertype]);

  return (
    <FlexWrapper>
        <FlexItemWrapper width={`md:w-1/1`}>
            {dataFetchedPaperTypes.loading && <Spinner />}
            {dataFetchedPaperTypes.error && <Messages>{dataFetchedPaperTypes.error}</Messages>}
            {!dataFetchedPaperTypes.loading && !dataFetchedPaperTypes.error && (
                <RadioView title={`Paper Type`} label={`papertype`} data={papertyperadios}/>
            )}
        </FlexItemWrapper>
    </FlexWrapper>
  )
}