import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
interface TextareaFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
  required?: boolean;
  tooltip?: React.ReactNode;
}

function TextareaField({
  id,
  label,
  placeholder,
  onChange,
  value,
  required,
  tooltip,
}: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1">{label}{tooltip}</Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        rows={5}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
}

export default TextareaField;
