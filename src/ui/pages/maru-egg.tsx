import React from 'react';

import Header from '../components/molecule/user/header/header';

const MaruEgg: React.FC = () => {
  return (
    <div className="min-w-[360px]">
      <div className="bg-background-default"></div>
      <Header type="수시" />
    </div>
  );
};

export default MaruEgg;
