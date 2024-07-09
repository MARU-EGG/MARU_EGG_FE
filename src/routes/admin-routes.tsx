import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../ui/pages/admin/login';
import PrivateRoute from './private-route';

const AdminRoutes: React.FC = () => {
  const token = sessionStorage.getItem('Authorization');
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/admin" element={<PrivateRoute component={<AdminLayout />} authenticated={token}/>} />
        <Route path="question/list" element={<QuestionList />} />
        <Route path="setting/category" element={<CategorySetting />} />
        <Route path="setting/file" element={<FileCheck />} />
      </Route> */}
    </Routes>
  );
};

export default AdminRoutes;
