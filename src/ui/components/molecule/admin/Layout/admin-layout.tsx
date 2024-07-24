import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import SlideMenu from '../slide-menu/slide-menu';
import { Header } from 'antd/es/layout/layout';

const { Sider, Content, Footer } = Layout;

const AdminLayout: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    pathname.split('/').map((a, i) => {
      console.log(pathname.split('/')[i]);
    });
  });

  const breadcrumpItem1 = pathname.split('/')[1];
  const breadcrumpItem2 = pathname.split('/')[2];

  const breadcrumpItems = [{ title: breadcrumpItem1 }, { title: breadcrumpItem2 }];
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ background: '#002968' }}>
        <SlideMenu />
      </Sider>
      <Layout className="site-layout">
        <Header className=" flex items-center bg-[#DFF4FF]">
          <Breadcrumb separator=">" items={breadcrumpItems} className=" text-lg pl-2 text-black" />
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
