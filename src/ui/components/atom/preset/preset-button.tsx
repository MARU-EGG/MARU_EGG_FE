import React from 'react';
import { cn } from '../../../../utils/style';

interface PresetButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isSelected?: boolean;
  disabled?: boolean;
  children: string;
}

const PresetButton = ({ onClick, isSelected, disabled, children }: PresetButtonProps) => {
  const buttonClasses = cn(
    'cursor-pointer rounded-full border border-gray text-black bg-white px-4 py-2 ',
    isSelected ? 'bg-primary-blue text-white border-primary-blue' : 'bg-white text-black',
    disabled ? 'bg-border-gray cursor-not-allowed text-border-gray bg-text-white' : '',
  );

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default PresetButton;
