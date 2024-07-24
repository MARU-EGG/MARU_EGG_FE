import React from 'react';
import { cn } from '../../../../utils/style';

interface IconButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'submit' | undefined;
  children: any;
}

const IconButton = ({ onClick, disabled, type, children }: IconButtonProps) => {
  return (
    <button
      className={cn(disabled ? 'cursor-default' : 'cursor-pointer')}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default IconButton;
