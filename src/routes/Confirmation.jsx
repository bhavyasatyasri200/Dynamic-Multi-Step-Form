import { CheckCircle2, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFormState } from '../state/FormContext';

const Confirmation = () => {
  const { formData } = useFormState();

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-100">
        <CheckCircle2 size={48} />
      </div>
      
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Registration Complete!</h1>
        <p className="text-slate-600">Thank you, <span className="font-semibold text-slate-900">{formData.firstName}</span>. Your application has been submitted successfully.</p>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800 border-b pb-2">Summary of Submission</h3>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <span className="text-slate-500">Full Name:</span>
          <span className="text-slate-900 text-right">{formData.firstName} {formData.lastName}</span>
          
          <span className="text-slate-500">Email:</span>
          <span className="text-slate-900 text-right">{formData.email}</span>
          
          <span className="text-slate-500">Employment:</span>
          <span className="text-slate-900 text-right">{formData.isEmployed}</span>
          
          {formData.isEmployed === 'Yes' && (
            <>
              <span className="text-slate-500">Company:</span>
              <span className="text-slate-900 text-right">{formData.companyName}</span>
            </>
          )}

          <span className="text-slate-500">Contact Method:</span>
          <span className="text-slate-900 text-right">{formData.preferredContactMethod}</span>
        </div>
      </div>

      <Link
        to="/"
        className="flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
      >
        <HomeIcon size={18} /> Back to Home
      </Link>
    </div>
  );
};

export default Confirmation;
