import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '../../state/FormContext';
import { InputField, RadioGroup, Button } from '../../components/ui/FormControls';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const step2Schema = z.object({
  isEmployed: z.enum(['Yes', 'No'], { required_error: 'Please select an option' }),
  companyName: z.string().optional().superRefine((val, ctx) => {
    // This will be handled in conditional validation
  }),
  jobTitle: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.isEmployed === 'Yes') {
    if (!data.companyName || data.companyName.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Company name is required and must be at least 2 characters',
        path: ['companyName'],
      });
    }
    if (!data.jobTitle || data.jobTitle.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Job title is required and must be at least 2 characters',
        path: ['jobTitle'],
      });
    }
  }
});

export const Step2 = () => {
  const { formData, updateFormData, nextStep, prevStep, setStepValidated } = useFormState();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      isEmployed: formData.isEmployed,
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
    },
    mode: 'onChange'
  });

  const isEmployed = watch('isEmployed');

  const onSubmit = (data) => {
    updateFormData(data);
    setStepValidated(2, true);
    nextStep();
    navigate('/form/step3');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Employment Status</h2>
        <p className="text-slate-500 text-sm">Provide details about your current occupation.</p>
      </div>

      <RadioGroup
        label="Are you currently employed?"
        options={[
          { label: 'Yes', value: 'Yes' },
          { label: 'No', value: 'No' },
        ]}
        registration={register('isEmployed')}
        error={errors.isEmployed}
      />

      {isEmployed === 'Yes' && (
        <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <InputField
            label="Company Name"
            placeholder="Acme Inc."
            registration={register('companyName')}
            error={errors.companyName}
          />
          <InputField
            label="Job Title"
            placeholder="Lead Developer"
            registration={register('jobTitle')}
            error={errors.jobTitle}
          />
        </div>
      )}

      <div className="flex justify-between pt-4 gap-4">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={() => { prevStep(); navigate('/form/step1'); }}
        >
          <ArrowLeft size={18} /> Back
        </Button>
        <Button>
          Continue <ArrowRight size={18} />
        </Button>
      </div>
    </form>
  );
};
