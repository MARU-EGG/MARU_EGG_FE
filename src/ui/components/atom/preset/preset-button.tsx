import React, { useState } from 'react';
import { cn } from '../../../../utils/style';

interface PresetButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: any;
}

const PresetButton = ({ onClick, disabled, children }: PresetButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onClick) {
      onClick(e);
    }
    setIsClicked(true);
  };

  return (
    <div className="px-4 py-2 border border-border-gray">
      <button
        className={cn(
          'cursor-pointer font-Pretendard px-4 py-2 font-normal text-[12px]',
          isClicked ? 'bg-primary-blue text-white' : 'bg-white text-black',
          disabled ? 'bg-border-gray' : '',
          'hover:bg-primary-blue hover:text-white',
          'focus:bg-primary-blue focus:text-white',
        )}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default PresetButton;
