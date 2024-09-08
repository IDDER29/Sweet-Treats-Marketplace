import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
function InputField({
  id,
  label,
  type = "text",
  placeholder,
  step,
  required,
  min,
  onChange,
}: any) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        step={step}
        required={required}
        min={min}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
