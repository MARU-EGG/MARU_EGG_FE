import React from 'react';
import Header from '../components/molecule/user/header/header';
import useTypeStore from '../../store/store';

const MaruEgg: React.FC = () => {
  const { setSelectedType, type } = useTypeStore();
  const handleButtonClick = (selectedType: 'SUSI' | 'PYEONIP' | 'JEONGSI') => {
    setSelectedType(selectedType);
  };

  return (
    <div className="min-w-[360px]">
      <div className="bg-background-default"></div>
      <Header type={type} />
      <div>
        <button onClick={() => handleButtonClick('SUSI')}>Select SUSI</button>
        <button onClick={() => handleButtonClick('PYEONIP')}>Select PYEONIP</button>
        <button onClick={() => handleButtonClick('JEONGSI')}>Select JEONGSI</button>
      </div>
    </div>
  );
};

export default MaruEgg;
