import React from 'react';
import { cn } from '../../../../utils/style';

interface IconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: any;
}

const IconButton = ({ onClick, disabled, children }: IconButtonProps) => {
  return (
    <button
      className={cn('cursor-pointer', disabled ? 'text-primary-blue' : 'text-black')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default IconButton;
