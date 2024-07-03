import React, { useMemo } from 'react';
import { Menu, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SlideMenu(props: MenuProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const items: MenuProps['items'] = useMemo(() => {
    return [
      { key: '/admin/question/list', label: '질문 목록' },
      { type: 'divider' },
      { key: '/admin/setting/preset', label: '질문 프리셋 변경' },
      { type: 'divider' },
      { key: '/admin/setting/category', label: '카테고리 변경' },
      { type: 'divider' },
      { key: '/admin/setting/file', label: '파일 확인' },
    ];
  }, []);

  const onClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <Menu
      style={{ background: '#FFF', fontSize: '1.2rem', padding: '0.8rem' }}
      {...props}
      items={items}
      selectedKeys={[location.pathname]}
      onClick={onClick}
    />
  );
}
