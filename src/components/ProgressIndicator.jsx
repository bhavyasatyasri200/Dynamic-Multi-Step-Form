import { useFormState } from '../state/FormContext';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 1, name: 'Personal', path: '/form/step1' },
  { id: 2, name: 'Employment', path: '/form/step2' },
  { id: 3, name: 'Preferences', path: '/form/step3' },
];

const ProgressIndicator = () => {
  const { currentStep, isValidated } = useFormState();
  const navigate = useNavigate();

  return (
    <nav aria-label="Progress">
      <ol className="flex items-center justify-between w-full">
        {steps.map((step, idx) => {
          const isCompleted = step.id < currentStep || isValidated[step.id];
          const isActive = step.id === currentStep;

          return (
            <li key={step.name} className={`relative ${idx !== steps.length - 1 ? 'flex-1' : ''}`}>
              <div className="flex items-center group">
                <button
                  type="button"
                  onClick={() => step.id < currentStep && navigate(step.path)}
                  disabled={step.id > currentStep}
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 z-10
                    ${isCompleted ? 'bg-primary-600 border-primary-600 text-white' : isActive ? 'bg-white border-primary-600 text-primary-600 ring-4 ring-primary-50' : 'bg-white border-slate-200 text-slate-400'}
                    ${step.id < currentStep ? 'cursor-pointer hover:bg-primary-700' : 'cursor-default'}
                  `}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? <Check size={20} /> : <span>{step.id}</span>}
                </button>
                
                <span className={`hidden md:block absolute top-12 left-0 text-xs font-bold uppercase tracking-wider transform -translate-x-1/4 ${isActive ? 'text-primary-600' : 'text-slate-400'}`}>
                  {step.name}
                </span>

                {idx !== steps.length - 1 && (
                  <div className={`
                    hidden md:block absolute top-5 left-10 w-full h-0.5 -z-0
                    ${isCompleted ? 'bg-primary-600' : 'bg-slate-200'}
                  `} />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default ProgressIndicator;
