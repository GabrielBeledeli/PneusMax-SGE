import React from "react";
import { Input } from "../atoms/Input";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  hideLabel?: boolean;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, id, error, hideLabel = false, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className={
            hideLabel ? "sr-only" : "text-sm font-semibold text-foreground"
          }
        >
          {label}
        </label>
        <Input id={id} name={id} ref={ref} {...props} />
        {error && (
          <span className="text-red-500 text-xs font-medium" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
