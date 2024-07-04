import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../ui/pages/admin/login';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/admin" element={<AdminLayout />}>
        <Route path="question/list" element={<QuestionList />} />
        <Route path="setting/category" element={<CategorySetting />} />
        <Route path="setting/file" element={<FileCheck />} />
      </Route> */}
    </Routes>
  );
};

export default AdminRoutes;
