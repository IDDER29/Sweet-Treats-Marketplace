// AuthSteps/PhoneNumberStep.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneNumberStepProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  handlePhoneSubmit: (method: "sms" | "whatsapp") => void;
}

export const PhoneNumberStep: React.FC<PhoneNumberStepProps> = ({
  phoneNumber,
  setPhoneNumber,
  handlePhoneSubmit,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-center">Add your phone number</p>
      <div className="flex space-x-2">
        <div className="w-1/3">
          <Label htmlFor="prefix">Prefix</Label>
          <Input id="prefix" value="MA+212" disabled />
        </div>
        <div className="w-2/3">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={() => handlePhoneSubmit("sms")} className="w-full">
          SMS
        </Button>
        <Button
          onClick={() => handlePhoneSubmit("whatsapp")}
          className="w-full"
        >
          WhatsApp
        </Button>
      </div>
    </div>
  );
};
