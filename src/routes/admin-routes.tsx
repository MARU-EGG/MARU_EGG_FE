import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import FileList from '../ui/pages/admin/file-list';
import Login from '../ui/pages/admin/login';
import AdminLayout from '../ui/components/admin/Layout/admin-layout';
import { getCookie } from '../utils/cookies';
import QuestionCheck from '../ui/pages/admin/question-check';
import GenerateQuestion from '../ui/pages/admin/generate-question';
import TypeDisabled from '../ui/pages/admin/type-disabled';
import DetailTypeCheck from '../ui/pages/admin/detail-type-check/detail-type-check';
const AdminRoutes: React.FC = () => {
  const token = getCookie('accessToken');
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute component={<AdminLayout />} authenticated={token} />}>
        <Route path="setting/file" element={<FileList />} />
        <Route path="setting/detail/type" element={<DetailTypeCheck />} />
        <Route path="question/list" element={<QuestionCheck />} />
        <Route path="generate/question" element={<GenerateQuestion />} />
        <Route path="setting/type" element={<TypeDisabled />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
