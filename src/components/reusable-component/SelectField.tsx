import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectField({
  label,
  options,
  required,
  id,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  required?: boolean;
  id: string;
  value: string; // Added value prop
  onChange: (value: string) => void; // Added onChange prop type
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select
        id={id}
        value={value} // Controlled value
        onValueChange={onChange} // Handle selection change
        required
      >
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectField;
