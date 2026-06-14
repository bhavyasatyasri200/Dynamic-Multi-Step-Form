import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FormContext = createContext();

export const useFormState = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormState must be used within a FormProvider');
  }
  return context;
};

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  isEmployed: '',
  companyName: '',
  jobTitle: '',
  newsletterSubscription: false,
  preferredContactMethod: '',
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem('formFlowData');
    return saved ? JSON.parse(saved) : initialState;
  });
  
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = sessionStorage.getItem('formFlowStep');
    return saved ? parseInt(saved) : 1;
  });

  const [isValidated, setIsValidated] = useState({
    1: false,
    2: false,
    3: false,
  });

  // Persist state to session storage
  useEffect(() => {
    sessionStorage.setItem('formFlowData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    sessionStorage.setItem('formFlowStep', currentStep.toString());
  }, [currentStep]);

  const updateFormData = useCallback((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const nextStep = useCallback(() => setCurrentStep((prev) => Math.min(prev + 1, 3)), []);
  const prevStep = useCallback(() => setCurrentStep((prev) => Math.max(prev - 1, 1)), []);

  const setStepValidated = useCallback((step, isValid) => {
    setIsValidated((prev) => ({ ...prev, [step]: isValid }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setCurrentStep(1);
    setIsValidated({ 1: false, 2: false, 3: false });
    sessionStorage.removeItem('formFlowData');
    sessionStorage.removeItem('formFlowStep');
  }, []);

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        isValidated,
        setStepValidated,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
