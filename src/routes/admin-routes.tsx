import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import FileList from '../ui/pages/admin/file-list';
import Login from '../ui/pages/admin/login';
import AdminLayout from '../ui/components/admin/Layout/admin-layout';
import { getCookie } from '../utils/cookies';
import QuestionCheck from '../ui/pages/admin/question-check';
const AdminRoutes: React.FC = () => {
  const token = getCookie('accessToken');
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute component={<AdminLayout />} authenticated={token} />}>
        <Route path="setting/file" element={<FileList />} />
        <Route path="question/list" element={<QuestionCheck />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
