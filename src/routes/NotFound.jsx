import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
      <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
        <FileQuestion size={48} />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">404 - Page Not Found</h1>
        <p className="text-slate-500 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>
      <Link
        to="/"
        className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all flex items-center gap-2"
      >
        <Home size={18} /> Take Me Home
      </Link>
    </div>
  );
};

export default NotFound;
