import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '../../state/FormContext';
import { InputField, Button } from '../../components/ui/FormControls';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';

import { checkEmailAvailability } from '../../services/api';

const step1Schema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .refine(async (email) => {
      const response = await checkEmailAvailability(email);
      return response.available;
    }, 'This email is already registered'),
});

export const Step1 = () => {
  const { formData, updateFormData, nextStep, setStepValidated } = useFormState();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting, isValidating: rhfValidating } } = useForm(
    { 
      resolver: zodResolver(step1Schema),
      defaultValues: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      },
      mode: 'onBlur'
    }
  );

  const onSubmit = (data) => {
    updateFormData(data);
    setStepValidated(1, true);
    nextStep();
    navigate('/form/step2');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
        <p className="text-slate-500 text-sm">Tell us a bit about yourself to get started.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          placeholder="Jane"
          registration={register('firstName')}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          placeholder="Doe"
          registration={register('lastName')}
          error={errors.lastName}
        />
      </div>

      <InputField
        label="Email Address"
        type="email"
        placeholder="jane.doe@example.com"
        registration={register('email')}
        error={errors.email}
        loading={rhfValidating}
      />

      <div className="flex justify-end pt-4">
        <Button disabled={isSubmitting || rhfValidating}>
          Continue <ArrowRight size={18} />
        </Button>
      </div>
    </form>
  );
};
