import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary-700">
            FormFlow
          </Link>
          <div className="flex gap-6">
            <Link 
              to="/" 
              className={`hover:text-primary-600 transition-colors ${location.pathname === '/' ? 'text-primary-600 font-semibold' : 'text-slate-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/form" 
              className={`hover:text-primary-600 transition-colors ${location.pathname.startsWith('/form') ? 'text-primary-600 font-semibold' : 'text-slate-600'}`}
            >
              Request Access
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <Outlet />
      </main>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          © 2026 FormFlow Inc. Built for accessibility and performance.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
