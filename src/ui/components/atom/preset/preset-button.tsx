import React, { useState } from 'react';
import { cn } from '../../../../utils/style';

interface PresetButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: React.ReactNode;
}

const PresetButton = ({ onClick, children }: PresetButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onClick) {
      onClick(e);
    }
    setIsClicked(true);
  };

  return (
    <button
      className={cn(
        'cursor-pointer px-4 py-2 rounded-full border border-border-gray',
        isClicked ? 'bg-primary-blue text-white' : 'bg-white text-black',
        'hover:bg-primary-blue hover:text-white',
        'focus:bg-primary-blue focus:text-white',
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default PresetButton;
