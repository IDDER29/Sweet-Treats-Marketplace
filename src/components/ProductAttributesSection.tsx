import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

function AttributesSection() {
  const attributes = [
    { id: "gluten-free", label: "Gluten-Free" },
    { id: "vegan", label: "Vegan" },
    { id: "organic", label: "Organic" },
    { id: "featured", label: "Featured Product" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {attributes.map((attr) => (
        <div key={attr.id} className="flex items-center space-x-2">
          <Switch id={attr.id} />
          <Label htmlFor={attr.id}>{attr.label}</Label>
        </div>
      ))}
    </div>
  );
}

export default AttributesSection;
