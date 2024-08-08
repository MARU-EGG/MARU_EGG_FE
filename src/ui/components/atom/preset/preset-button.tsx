import React, { useState } from 'react';
import { cn } from '../../../../utils/style';

interface PresetButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: string;
}

const PresetButton = ({ onClick, disabled, children }: PresetButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onClick) {
      onClick(e);
    }
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // 클릭 후 200ms 후에 초기화
  };

const buttonClasses = cn(
  'cursor-pointer rounded-full border border-gray text-black bg-white',
  isClicked ? 'bg-primary-blue text-white border-primary-blue' : 'bg-white text-black',
  disabled ? 'bg-border-gray cursor-not-allowed text-border-gray bg-text-white' : '',
);

return (
  <button className={buttonClasses} onClick={handleClick} disabled={disabled}>
    {children}
  </button>
);
};

export default PresetButton;
