import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
function TextareaField({ id, label, placeholder, onChange }: any) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        rows={5}
        onChange={onChange}
      />
    </div>
  );
}

export default TextareaField;
