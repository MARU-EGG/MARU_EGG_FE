import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import PageTest from '../ui/pages/page-test';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<div>챗봇이 들어갈 곳</div>} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/test/*" element={<PageTest />} />
    </Routes>
  );
};

export default AppRoutes;
