import React from 'react';
import { cn } from '../../../../utils/style';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextArea(
  { disabled = false, placeholder, onValueChange, value },
  ref,
) {
  return (
    <input
      ref={ref}
      type="text"
      className={cn(
        `w-full rounded-2xl bg-transparent px-4 py-2 text-base`,
        `placeholder:text-[#72777A] focus:outline-none`,
        `disabled:cursor-wait`,
      )}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => {
        onValueChange?.(e.target.value);
      }}
    />
  );
});

export default TextInput;
