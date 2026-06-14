import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '../../state/FormContext';
import { SelectField, Checkbox, Button } from '../../components/ui/FormControls';
import { Send, ArrowLeft } from 'lucide-react';
import { submitForm } from '../../services/api';
import { useState } from 'react';

const step3Schema = z.object({
  newsletterSubscription: z.boolean().default(false),
  preferredContactMethod: z.string().min(1, 'Please select a preferred contact method'),
});

export const Step3 = () => {
  const { formData, updateFormData, prevStep, setStepValidated, resetForm } = useFormState();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      newsletterSubscription: formData.newsletterSubscription,
      preferredContactMethod: formData.preferredContactMethod,
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    
    // Final merge of data
    const finalData = { ...formData, ...data };
    
    try {
      const response = await submitForm(finalData);
      if (response.success) {
        updateFormData(data);
        setStepValidated(3, true);
        navigate('/confirmation');
      } else {
        setError(response.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during submission. Is the server running?');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Preferences</h2>
        <p className="text-slate-500 text-sm">Final touches to customize your experience.</p>
      </div>

      <SelectField
        label="Preferred Contact Method"
        options={[
          { label: 'Email', value: 'Email' },
          { label: 'Phone', value: 'Phone' },
          { label: 'SMS', value: 'SMS' },
        ]}
        registration={register('preferredContactMethod')}
        error={errors.preferredContactMethod}
      />

      <Checkbox
        label="I want to receive the weekly newsletter with the latest updates."
        registration={register('newsletterSubscription')}
        error={errors.newsletterSubscription}
      />

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="flex justify-between pt-4 gap-4">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={() => { prevStep(); navigate('/form/step2'); }}
          disabled={isSubmitting}
        >
          <ArrowLeft size={18} /> Back
        </Button>
        <Button disabled={isSubmitting || Object.keys(errors).length > 0}>
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Submitting...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Submit <Send size={18} />
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};
