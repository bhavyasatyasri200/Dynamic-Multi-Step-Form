import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MultiStepForm from '../forms/MultiStepForm';

const FormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to first step if navigating directly to /form
  useEffect(() => {
    if (location.pathname === '/form' || location.pathname === '/form/') {
      navigate('step1', { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
        <MultiStepForm />
      </div>
    </div>
  );
};

export default FormPage;
