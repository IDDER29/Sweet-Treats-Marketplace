// AuthSteps/AddressStep.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AddressStepProps {
  address: string;
  setAddress: (value: string) => void;
  handleAddressSubmit: () => void;
}

export const AddressStep: React.FC<AddressStepProps> = ({
  address,
  setAddress,
  handleAddressSubmit,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-center">Add your delivery address</p>
      <Textarea
        placeholder="Enter your full address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button onClick={handleAddressSubmit} className="w-full">
        Submit Address
      </Button>
    </div>
  );
};
