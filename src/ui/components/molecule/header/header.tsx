import React, { useState } from 'react';
import { ReactComponent as RefreshIcon } from '../../../../assets/Refresh.svg';
import { ReactComponent as MenuIcon } from '../../../../assets/Menu.svg';
import maruEgg from '../../../../assets/maru-egg.png';
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
    <div className="absolute z-10 flex w-full items-center justify-between rounded-tl-2xl rounded-tr-2xl bg-white px-4 py-4">
      <IconButton onClick={handleRefreshClick}>
        <RefreshIcon />
      </IconButton>
      <div className="flex items-center">
        {/* <img className="mr-2 h-8 w-8" src={maruEgg} alt="마루에그 캐릭터" /> */}
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
