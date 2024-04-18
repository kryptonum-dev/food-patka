import type { FieldErrors } from 'react-hook-form';

export type CheckboxTypes = {
  label: React.ReactNode;
  register: {
    name: string;
  };
  errors: FieldErrors;
} & React.InputHTMLAttributes<HTMLInputElement>;
