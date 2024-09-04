import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SlideMenu from '../slide-menu/slide-menu';
import { Header } from 'antd/es/layout/layout';
import { AdminLogout } from '../../../../api/admin/admin-login';
import { removeCookie } from '../../../../utils/cookies';

const { Sider, Content, Footer } = Layout;

const AdminLayout: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    pathname.split('/').map((a, i) => {
      console.log(pathname.split('/')[i]);
    });
  });

  const handleLogout = () => {
    AdminLogout();
    navigate('/admin/login');
  };

  const breadcrumpItem1 = pathname.split('/')[1];
  const breadcrumpItem2 = pathname.split('/')[2];
  const breadcrumpItem3 = pathname.split('/')[3];

  const breadcrumpItems = [{ title: breadcrumpItem1 }, { title: breadcrumpItem2 }, { title: breadcrumpItem3 }];
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ background: '#002968' }}>
        <SlideMenu />
      </Sider>
      <Layout className="site-layout">
        <Header className="flex items-center justify-between bg-white">
          <Breadcrumb separator=">" items={breadcrumpItems} className="pl-2 text-lg text-black" />
          <Button type="primary" onClick={handleLogout}>
            로그아웃
          </Button>
        </Header>
        <Content style={{ margin: '16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
