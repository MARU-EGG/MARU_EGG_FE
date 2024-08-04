import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import FileList from '../ui/pages/admin/file-list';
import AdminLayout from '../ui/components/molecule/admin/Layout/admin-layout';
import Login from '../ui/pages/admin/login';

const AdminRoutes: React.FC = () => {
  const token = sessionStorage.getItem('Authorization');
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute component={<AdminLayout />} authenticated={token} />}>
        <Route path="setting/file" element={<FileList />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
