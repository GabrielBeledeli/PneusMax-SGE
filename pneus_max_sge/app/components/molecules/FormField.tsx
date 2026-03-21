import { InputHTMLAttributes } from "react";
import { Input } from "../atoms/Input";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function FormField({ label, id, ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label 
        htmlFor={id} 
        className="text-sm font-semibold text-foreground"
      >
        {label}
      </label>
      <Input id={id} name={id} {...props} />
    </div>
  );
}
