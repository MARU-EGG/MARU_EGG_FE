import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import PresetButton from '../../atom/preset/preset-button';
import useTypeStore from '../../../../store/type-store';
import { ReactComponent as XIcon } from '../../../../assets/X.svg';
import IconButton from '../../atom/icon/icon-button';

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MenuDrawer = ({ open, onClose }: MenuDrawerProps) => {
  const [selectedButton, setSelectedButton] = React.useState<'SUSI' | 'PYEONIP' | 'JEONGSI' | null>(null);
  const { type } = useTypeStore();

  useEffect(() => {
    setSelectedButton(type);
  }, [type]);
  const handleButtonClick = (selectedType: 'SUSI' | 'PYEONIP' | 'JEONGSI') => {
    setSelectedButton(selectedType);
  };
  return (
    <Drawer placement="bottom" closable={false} open={open} onClose={onClose} className="rounded-t-3xl" height={244}>
      <div className="flex">
        <div className="flex w-full justify-between py-2">
          <div>
            <PresetButton onClick={() => handleButtonClick('SUSI')} isSelected={selectedButton === 'SUSI'}>
              수시
            </PresetButton>
            <PresetButton onClick={() => handleButtonClick('PYEONIP')} isSelected={selectedButton === 'PYEONIP'}>
              편입
            </PresetButton>
            <PresetButton onClick={() => handleButtonClick('JEONGSI')} isSelected={selectedButton === 'JEONGSI'}>
              정시
            </PresetButton>
          </div>
          <IconButton onClick={onClose}>
            <XIcon className="rounded-full bg-gray-100" />
          </IconButton>
        </div>
      </div>
      <div className="w-full cursor-pointer p-2 text-start font-pretendard text-sm hover:bg-[#F4F4F4]">
        FAQ 바로가기
      </div>
      <div className="w-full cursor-pointer p-2 text-start font-pretendard text-sm hover:bg-[#F4F4F4]">
        입시결과 바로가기
      </div>
      <div className="w-full cursor-pointer p-2 text-start font-pretendard text-sm hover:bg-[#F4F4F4]">
        모집요강 바로가기
      </div>
      <div className="p-2 font-pretendard text-xs">
        학생부교과, 실기/실적위주, 기타 문의------입학관리팀 : 02)300-1799, 1800 <br />
        학생부종합 문의 ------------------------인재발굴팀 : 02)300-1797, 1844
      </div>
      <div className="p-2 font-pretendard text-xs"></div>
    </Drawer>
  );
};

export default MenuDrawer;
