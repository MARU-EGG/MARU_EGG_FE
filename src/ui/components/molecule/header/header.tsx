import React, { useState } from 'react';
import { ReactComponent as RefreshIcon } from '../../../../assets/Refresh.svg';
import { ReactComponent as MenuIcon } from '../../../../assets/Menu.svg';
import IconButton from '../../atom/icon/icon-button';
import MenuDrawer from '../menu-drawer/menu-drawer';

interface HeaderProps {
  type: undefined | 'SUSI' | 'PYEONIP' | 'JEONGSI';
}

const Header = ({ type }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleRefreshClick = () => {
    window.location.reload();
    console.log('새로고침');
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseDrawer = () => {
    setMenuOpen(false);
  };

  return (
    <div className="absolute z-10 flex w-full items-center justify-between bg-white p-4 mobile:rounded-none mobile:px-4 mobile:py-4 desktop:rounded-tl-3xl desktop:rounded-tr-3xl desktop:px-4 desktop:py-4">
      <IconButton onClick={handleRefreshClick}>
        <RefreshIcon />
      </IconButton>
      <div className="flex items-center">
        <div className="mr-8 font-pretendard text-lg font-semibold text-primary-blue">명지대학교 입학처 챗봇</div>
        {type && (
          <ul role="list" className="flex list-disc items-center marker:text-primary-blue">
            <li className="pl-0">
              <div className="flex text-body2">
                <p className="text-primary-blue">
                  {type === 'SUSI' ? '수시' : type === 'JEONGSI' ? '정시' : '편입'}&nbsp;
                </p>
                <p>질문중</p>
              </div>
            </li>
          </ul>
        )}
      </div>
      <IconButton onClick={handleMenuClick}>
        <MenuIcon />
      </IconButton>
      <MenuDrawer open={menuOpen} onClose={handleCloseDrawer} />
    </div>
  );
};

export default Header;
