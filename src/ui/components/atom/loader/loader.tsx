import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex space-x-2">
        <div className="h-3 w-3 animate-pulse rounded-full bg-primary-blue" style={{ animationDelay: '-0.3s' }}></div>
        <div className="h-3 w-3 animate-pulse rounded-full bg-primary-blue" style={{ animationDelay: '0.1s' }}></div>
        <div className="h-3 w-3 animate-pulse rounded-full bg-primary-blue" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
};

export default Loader;
