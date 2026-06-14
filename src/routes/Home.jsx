import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Laptop } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-6 pt-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Streamline your onboarding <br />
          <span className="text-primary-600">in seconds.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A highly accessible, multi-step registration process designed to capture essential information while providing an elite user experience.
        </p>
        <div className="flex justify-center pt-4">
          <Link
            to="/form"
            className="bg-primary-600 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-700 transition-all flex items-center gap-2 shadow-lg shadow-primary-200"
          >
            Get Started <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 py-12">
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
            <ShieldCheck />
          </div>
          <h3 className="font-bold text-xl">Accessible First</h3>
          <p className="text-slate-500">Fully WCAG 2.1 AA compliant, ensuring everyone can use your application with ease.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
            <Zap />
          </div>
          <h3 className="font-bold text-xl">Dynamic Logic</h3>
          <p className="text-slate-500">Conditional field rendering and client-side validation for a seamless user journey.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
            <Laptop />
          </div>
          <h3 className="font-bold text-xl">Fully Responsive</h3>
          <p className="text-slate-500">Optimized for every device, from mobile phones to high-resolution desktop monitors.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
