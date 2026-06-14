import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { FormProvider, useFormState } from '../state/FormContext';

const wrapper = ({ children }) => <FormProvider>{children}</FormProvider>;

describe('FormContext State Management', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useFormState(), { wrapper });
    
    expect(result.current.currentStep).toBe(1);
    expect(result.current.formData.firstName).toBe('');
    expect(result.current.formData.isEmployed).toBe('');
  });

  it('should update form data', () => {
    const { result } = renderHook(() => useFormState(), { wrapper });
    
    act(() => {
      result.current.updateFormData({ firstName: 'Jane' });
    });
    
    expect(result.current.formData.firstName).toBe('Jane');
  });

  it('should handle step navigation', () => {
    const { result } = renderHook(() => useFormState(), { wrapper });
    
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(2);
    
    act(() => {
      result.current.prevStep();
    });
    expect(result.current.currentStep).toBe(1);
  });

  it('should reset form', () => {
    const { result } = renderHook(() => useFormState(), { wrapper });
    
    act(() => {
      result.current.updateFormData({ firstName: 'Jane' });
      result.current.nextStep();
      result.current.resetForm();
    });
    
    expect(result.current.formData.firstName).toBe('');
    expect(result.current.currentStep).toBe(1);
  });
});
