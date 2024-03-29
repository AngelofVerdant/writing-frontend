'use client'
import { useEffect, useState } from 'react'
import { FlexItemWrapper, FlexWrapper, LabelView, TextInputView } from '@/helpers';

export default function PageSourceStep({ stepIndex, stepperProps, stepData, setPageSourceStepValid  }) {
    const { setStepInputData } = stepperProps;

    const { paperpages, papersources } = stepData[stepIndex] || {};

    const handleStepperInput = (fieldName, value) => {
      setStepInputData(stepIndex, { ...stepData[stepIndex], [fieldName]: value });
    };

    const [validations, setValidations] = useState({
      paperpages: true,
      papersources: true,
    });

    const validateInputs = () => {
        const newValidations = {
            paperpages: !!paperpages,
            papersources: !!papersources,
        };

        setValidations(newValidations);

        const allInputsValid = Object.values(newValidations).every((isValid) => isValid);
        setPageSourceStepValid(allInputsValid);
    };

    useEffect(() => {
        validateInputs();
    }, [paperpages, papersources]);

  return (
    <FlexWrapper>
        <FlexItemWrapper width={`md:w-1/4`}>
            <LabelView name={`Number of Pages`} forWhat={`pages`} />
            <TextInputView
                id={`pages`}
                type={`number`}
                name={`pages`}
                value={paperpages ? paperpages : ''}
                change={(e) => handleStepperInput('paperpages', e.target.value)}
                autoComplete={false}
                placeholder={`0`}
            />
        </FlexItemWrapper>
        <FlexItemWrapper width={`md:w-1/4`}>
            <LabelView name={`Number of Sources`} forWhat={`sources`} />
            <TextInputView
                id={`sources`}
                type={`number`}
                name={`sources`}
                value={papersources ? papersources : ''}
                change={(e) => handleStepperInput('papersources', e.target.value)}
                autoComplete={false}
                placeholder={`0`}
            />
        </FlexItemWrapper>
    </FlexWrapper>
  )
}