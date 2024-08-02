import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminRoutes from './admin-routes';
import PageTest from '../ui/pages/page-test';
import MaruEgg from '../ui/pages/maru-egg';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MaruEgg />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/test/*" element={<PageTest />} />
    </Routes>
  );
};

export default AppRoutes;
