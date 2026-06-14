import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FormProvider } from '../state/FormContext';
import Home from './Home';
import FormPage from './FormPage';
import Confirmation from './Confirmation';
import NotFound from './NotFound';
import Layout from '../components/Layout';

const AppRouter = () => {
  return (
    <Router>
      <FormProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="form/*" element={<FormPage />} />
            <Route path="confirmation" element={<Confirmation />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </FormProvider>
    </Router>
  );
};

export default AppRouter;
