'use client'
import { useEffect, useState } from 'react'
import { FlexItemWrapper, FlexWrapper, Messages, RadioView, Spinner } from '@/helpers';
import { useRadioObject, useResourceSingle } from '@/hooks';

export default function PaperStep({ stepIndex, stepperProps, stepData, setPaperStepValid  }) {
    const { setStepInputData } = stepperProps;
    const { paper } = stepData[stepIndex] || {};
    const { level } = stepData[0] || {};

    const handleStepperInput = (fieldName, value) => {
      setStepInputData(stepIndex, { ...stepData[stepIndex], [fieldName]: value });
    };

    const { data: dataFetchedPapers } = useResourceSingle('levels/papers', level.id);

    const [papers, setPapers] = useState([]);
    useEffect(() => {
      if (dataFetchedPapers.success) {
        const extractedPapers = dataFetchedPapers.data.level.LevelPapers?.map(paper => ({
          id: paper.paper_id,
          title: paper.papername
        }));
        setPapers(extractedPapers || []);
      }
    }, [dataFetchedPapers]);
    const [selectedpaper, paperradios] = useRadioObject(papers, 'md:w-1/2');

    useEffect(() => {
      handleStepperInput('paper', selectedpaper);
    }, [selectedpaper]);

    const [validations, setValidations] = useState({
        paper: true,
    });

    const validateInputs = () => {
        const newValidations = {
            paper: !!paper,
        };

        setValidations(newValidations);

        const allInputsValid = Object.values(newValidations).every((isValid) => isValid);
        setPaperStepValid(allInputsValid);
    };

    useEffect(() => {
        validateInputs();
    }, [paper]);

  return (
    <FlexWrapper>
        <FlexItemWrapper width={`md:w-1/1`}>
            {dataFetchedPapers.loading && <Spinner />}
            {dataFetchedPapers.error && <Messages>{dataFetchedPapers.error}</Messages>}
            {!dataFetchedPapers.loading && !dataFetchedPapers.error && (
                <RadioView title={`Choose Paper`} label={`paper`} data={paperradios}/>
            )}
        </FlexItemWrapper>
    </FlexWrapper>
  )
}