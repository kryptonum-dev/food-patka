import type { FieldErrors } from 'react-hook-form';

export type InputTypes = {
  register: {
    name: string;
  };
  label: string;
  errors: FieldErrors;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;
