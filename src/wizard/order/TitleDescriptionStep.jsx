'use client'
import { useEffect, useState } from 'react'
import { FlexItemWrapper, FlexWrapper, LabelView, TextAreaView, TextInputView } from '@/helpers';

export default function TitleDescriptionStep({ stepIndex, stepperProps, stepData, setTitleDescriptionStepValid  }) {
    const { setStepInputData } = stepperProps;

    const { ordertitle, orderdescription } = stepData[stepIndex] || null;

    const handleStepperInput = (fieldName, value) => {
        setStepInputData(stepIndex, { ...stepData[stepIndex], [fieldName]: value });
    };

    const [validations, setValidations] = useState({
        ordertitle: true,
        orderdescription: true,
    });

    const validateInputs = () => {
        const newValidations = {
            ordertitle: !!ordertitle,
            orderdescription: !!orderdescription,
        };

        setValidations(newValidations);

        const allInputsValid = Object.values(newValidations).every((isValid) => isValid);
        setTitleDescriptionStepValid(allInputsValid);
    };

    useEffect(() => {
        validateInputs();
    }, [ordertitle, orderdescription]);

  return (
    <FlexWrapper>
        <FlexItemWrapper width={`md:w-1/2`}>
            <LabelView name={`Order Title`} forWhat={`ordertitle`} />
            <TextInputView
                id={`ordertitle`}
                type={`text`}
                name={`ordertitle`}
                value={ordertitle ? ordertitle : ''}
                change={(e) => handleStepperInput('ordertitle', e.target.value)}
                autoComplete={false}
                placeholder={`Title for the order`}
            />
        </FlexItemWrapper>
        <FlexItemWrapper width={`md:w-1/1`}>
            <LabelView name={`Order Description`} forWhat={`orderdescription`} />
            <TextAreaView
                id={`seodescription`}
                name={`seodescription`}
                value={orderdescription ? orderdescription : ''}
                change={(e) => handleStepperInput('orderdescription', e.target.value)}
                rows={6}
                maxLength={2000}
                minLength={100}
                autoComplete={false}
                preventDefaultPaste={false}
                placeholder={`Description of the order`}
            />
        </FlexItemWrapper>
    </FlexWrapper>
  )
}