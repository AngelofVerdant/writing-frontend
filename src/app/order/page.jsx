'use client'
import { useState } from 'react'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, HeaderActionView, Messages, NonFormWrapper, Spinner, WizardFooterActionView } from '@/helpers';
import { useCreateResource, useStepper } from '@/hooks';
import { EducationStep, TitleDescriptionStep, PaperStep, DeadlineSpaceStep, TypeStep, PageSourceStep, ConditionStep, DocumentStep } from '@/wizard/order';

export default function OrderWizard() {
    const [stepperProps, currentStepContent, stepData] = useStepper(0, [
        'Step 0',
        'Step 1',
        'Step 2',
        'Step 3',
        'Step 4',
        'Step 5',
        'Step 6',
        'Step 7',
      ], 'orderData');

    const [isEducationStepValid, setEducationStepValid] = useState(false);
    const [isPaperStepValid, setPaperStepValid] = useState(false);
    const [isTypeStepValid, setTypeStepValid] = useState(false);
    const [isTitleDescriptionStepValid, setTitleDescriptionStepValid] = useState(false);
    const [isDeadlineSpaceStepValid, setDeadlineSpaceStepValid] = useState(false);
    const [isPageSourceStepValid, setPageSourceStepValid] = useState(false);
    const [isDocumentStepValid, setDocumentStepValid] = useState(false);
    const [isConditionStepValid, setConditionStepValid] = useState(false);

    const steps = [
        <EducationStep stepIndex={0} stepperProps={stepperProps} stepData={stepData} setEducationStepValid={setEducationStepValid}/>,
        <PaperStep stepIndex={1} stepperProps={stepperProps} stepData={stepData} setPaperStepValid={setPaperStepValid}/>,
        <TypeStep stepIndex={2} stepperProps={stepperProps} stepData={stepData} setTypeStepValid={setTypeStepValid}/>,
        <TitleDescriptionStep stepIndex={3} stepperProps={stepperProps} stepData={stepData} setTitleDescriptionStepValid={setTitleDescriptionStepValid}/>,
        <DeadlineSpaceStep stepIndex={4} stepperProps={stepperProps} stepData={stepData} setDeadlineSpaceStepValid={setDeadlineSpaceStepValid}/>,
        <PageSourceStep stepIndex={5} stepperProps={stepperProps} stepData={stepData} setPageSourceStepValid={setPageSourceStepValid}/>,
        <DocumentStep stepIndex={6} stepperProps={stepperProps} stepData={stepData} setDocumentStepValid={setDocumentStepValid}/>,
        <ConditionStep stepIndex={7} stepperProps={stepperProps} stepData={stepData} setConditionStepValid={setConditionStepValid}/>,
      ];

    const progress = ((stepperProps.currentStep + 1) / steps.length) * 100;

    const handleNextStep = () => {
        if (stepperProps.currentStep === 0 && !isEducationStepValid) return;

        if (stepperProps.currentStep === 1 && !isPaperStepValid) return;

        if (stepperProps.currentStep === 2 && !isTypeStepValid) return;

        if (stepperProps.currentStep === 3 && !isTitleDescriptionStepValid) return;

        if (stepperProps.currentStep === 4 && !isDeadlineSpaceStepValid) return;

        if (stepperProps.currentStep === 5 && !isPageSourceStepValid) return;

        if (stepperProps.currentStep === 6 && !isDocumentStepValid) return;
    
        stepperProps.goToNextStep();
    };

    const { data: dataCreated, createResource } = useCreateResource('orders');
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (stepperProps.currentStep === 7 && !isConditionStepValid) return;

        const newResource = {
            levelId: stepData[0].level.id,
            paperId: stepData[1].paper.id,
            typeId: stepData[2].papertype.id,
            ordertitle: stepData[3].ordertitle,
            orderdescription: stepData[3].orderdescription,
            orderspace: stepData[4].paperspace,
            orderdeadline: stepData[4].paperdeadline,
            orderformat: stepData[4].paperformat,
            orderlanguage: stepData[4].paperlanguage,
            orderpages: stepData[5].paperpages,
            ordersources: stepData[5].papersources,
            orderdefaultimage: stepData[6].paperdefaultimage,
            orderimages: stepData[6].paperimages,
        };
        createResource(newResource, '/user/o/orders');
    };

  return (
    <ContainerWrapper>
        <HeaderActionView
            itemText="Order Onboarding"
        />
        {dataCreated.loading && <Spinner/>}
        {dataCreated.error && !dataCreated.loading && <Messages>{dataCreated.error}</Messages>}
        <NonFormWrapper>

            <FlexWrapper>
                <FlexItemWrapper width={`md:w-1/1`}>
                    <div className="mt-4">{steps[stepperProps.currentStep]}</div>
                </FlexItemWrapper>
            </FlexWrapper>
        
            <WizardFooterActionView 
                handleSubmit={handleSubmit} 
                data={dataCreated}
                stepperProps={stepperProps}
                handleNextStep={handleNextStep}
            />

        </NonFormWrapper>
    </ContainerWrapper>
  )
}