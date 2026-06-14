import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useFormState } from '../state/FormContext';
import ProgressIndicator from '../components/ProgressIndicator';
import { Step1, Step2, Step3 } from './steps';
import { useEffect } from 'react';

const MultiStepForm = () => {
  const { currentStep, setCurrentStep } = useFormState();
  const navigate = useNavigate();
  const location = useLocation();

  // Sync state with URL
  useEffect(() => {
    const step = parseInt(location.pathname.match(/step(\d)/)?.[1] || '1');
    if (step !== currentStep) {
      setCurrentStep(step);
    }
  }, [location]);

  return (
    <div className="flex flex-col h-full min-h-[500px]">
      <div className="p-8 border-b bg-slate-50/50">
        <ProgressIndicator />
      </div>
      
      <div className="flex-grow p-8">
        <Routes>
          <Route path="step1" element={<Step1 />} />
          <Route path="step2" element={<Step2 />} />
          <Route path="step3" element={<Step3 />} />
        </Routes>
      </div>
    </div>
  );
};

export default MultiStepForm;
