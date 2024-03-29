'use client'
import { useEffect, useState } from 'react'
import { FlexItemWrapper, FlexWrapper, RadioView } from '@/helpers';
import { useRadioObject } from '@/hooks';

export default function ConditionStep({ stepIndex, stepperProps, stepData, setConditionStepValid  }) {
    const { setStepInputData } = stepperProps;
    const { condition } = stepData[stepIndex] || {};

    const handleStepperInput = (fieldName, value) => {
      setStepInputData(stepIndex, { ...stepData[stepIndex], [fieldName]: value });
    };

    const conditions = [
        {
            id: 1,
            title: 'I Agree',
        }
    ];

    const [selectedcondition, conditionradios] = useRadioObject(conditions, 'md:w-1/2');

    useEffect(() => {
      handleStepperInput('condition', selectedcondition);
    }, [selectedcondition]);

    const [validations, setValidations] = useState({
        condition: true,
    });

    const validateInputs = () => {
        const newValidations = {
            condition: !!condition,
        };

        setValidations(newValidations);

        const allInputsValid = Object.values(newValidations).every((isValid) => isValid);
        setConditionStepValid(allInputsValid);
    };

    useEffect(() => {
        validateInputs();
    }, [condition]);

  return (
    <FlexWrapper>
        <FlexItemWrapper width={`md:w-1/1`}>
            <RadioView title={`Please Agree to terms and conditions`} label={`condition`} data={conditionradios}/>
        </FlexItemWrapper>
    </FlexWrapper>
  )
}