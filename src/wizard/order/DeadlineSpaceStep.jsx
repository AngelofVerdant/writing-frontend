'use client'
import { useEffect, useState } from 'react'
import { FlexItemWrapper, FlexWrapper, RadioView } from '@/helpers';
import { useRadioObject } from '@/hooks';
import { deadlines, formats, languages, spaces } from '@/data/order';

export default function DeadlineSpaceStep({ stepIndex, stepperProps, stepData, setDeadlineSpaceStepValid  }) {
    const { setStepInputData } = stepperProps;

    const { paperdeadline, paperspace, paperformat, paperlanguage } = stepData[stepIndex] || {};

    const handleStepperInput = (fieldName, value) => {
      setStepInputData(stepIndex, { ...stepData[stepIndex], [fieldName]: value });
    };

    const [deadline, deadlineradios] = useRadioObject(deadlines, 'md:w-1/4');
    const [space, spaceradios] = useRadioObject(spaces, 'md:w-1/2');
    const [format, formatradios] = useRadioObject(formats, 'md:w-1/2');
    const [language, languageradios] = useRadioObject(languages, 'md:w-1/2');

    useEffect(() => {
      handleStepperInput('paperdeadline', deadline);
    }, [deadline]);

    useEffect(() => {
      handleStepperInput('paperspace', space);
    }, [space]);

    useEffect(() => {
      handleStepperInput('paperformat', format);
    }, [format]);

    useEffect(() => {
      handleStepperInput('paperlanguage', language);
    }, [language]);

    const [validations, setValidations] = useState({
      deadline: true,
      space: true,
      format: true,
      language: true,
    });

    const validateInputs = () => {
        const newValidations = {
            deadline: !!deadline,
            space: !!space,
            format: !!format,
            language: !!language,
        };

        setValidations(newValidations);

        const allInputsValid = Object.values(newValidations).every((isValid) => isValid);
        setDeadlineSpaceStepValid(allInputsValid);
    };

    useEffect(() => {
        validateInputs();
    }, [paperdeadline, paperspace, paperformat, paperlanguage]);

  return (
    <FlexWrapper>
        <FlexItemWrapper width={`md:w-1/2`}>
            <RadioView title={`Deadline`} label={`deadline`} data={deadlineradios}/>
        </FlexItemWrapper>
        <FlexItemWrapper width={`md:w-1/2`}>
            <RadioView title={`Spacing`} label={`space`} data={spaceradios}/>
        </FlexItemWrapper>
        <FlexItemWrapper width={`md:w-1/2`}>
            <RadioView title={`Format`} label={`format`} data={formatradios}/>
        </FlexItemWrapper>
        <FlexItemWrapper width={`md:w-1/2`}>
            <RadioView title={`Language`} label={`language`} data={languageradios}/>
        </FlexItemWrapper>
    </FlexWrapper>
  )
}