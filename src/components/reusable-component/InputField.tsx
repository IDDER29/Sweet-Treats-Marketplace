import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  step?: string | number;
  required?: boolean;
  min?: string | number;
  max?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  tooltip?: React.ReactNode;
}

function InputField({
  id,
  label,
  type = "text",
  placeholder,
  step,
  required,
  min,
  onChange,
  value,
  tooltip,
  max,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1">{label}{tooltip}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        step={step}
        required={required}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
