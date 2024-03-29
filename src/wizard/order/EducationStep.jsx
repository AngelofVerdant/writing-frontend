'use client'
import { useEffect, useState } from 'react'
import { FlexItemWrapper, FlexWrapper, Messages, RadioView, Spinner } from '@/helpers';
import { useFetchResource, useRadioObject, useResourceSingle } from '@/hooks';

export default function EducationStep({ stepIndex, stepperProps, stepData, setEducationStepValid  }) {
    const { setStepInputData } = stepperProps;
    const { level } = stepData[stepIndex] || {};

    const handleStepperInput = (fieldName, value) => {
      setStepInputData(stepIndex, { ...stepData[stepIndex], [fieldName]: value });
    };

    const { data: dataFetchedLevels } = useFetchResource('levels/all');

    const [levels, setSeasons] = useState([]);
    useEffect(() => {
      if (dataFetchedLevels.success) {
        setSeasons(dataFetchedLevels.data.levels);
      }
    }, [dataFetchedLevels]);
    const [selectedlevel, levelradios] = useRadioObject(levels, 'md:w-1/2');


    useEffect(() => {
      handleStepperInput('level', selectedlevel);
    }, [selectedlevel]);

    const [validations, setValidations] = useState({
        level: true,
    });

    const validateInputs = () => {
        const newValidations = {
            level: !!level,
        };

        setValidations(newValidations);

        const allInputsValid = Object.values(newValidations).every((isValid) => isValid);
        setEducationStepValid(allInputsValid);
    };

    useEffect(() => {
        validateInputs();
    }, [level]);

  return (
    <FlexWrapper>
        <FlexItemWrapper width={`md:w-1/1`}>
            {dataFetchedLevels.loading && <Spinner />}
            {dataFetchedLevels.error && <Messages>{dataFetchedLevels.error}</Messages>}
            {!dataFetchedLevels.loading && !dataFetchedLevels.error && (
                <RadioView title={`Choose Education Level`} label={`level`} data={levelradios}/>
            )}
        </FlexItemWrapper>
    </FlexWrapper>
  )
}