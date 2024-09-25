// AuthSteps/VerifyInfoStep.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, MapPin } from "lucide-react";

interface VerifyInfoStepProps {
  phoneNumber: string;
  address: string;
  handleVerifyInfo: () => void;
  handleLogout: () => void;
}

export const VerifyInfoStep: React.FC<VerifyInfoStepProps> = ({
  phoneNumber,
  address,
  handleVerifyInfo,
  handleLogout,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-center">Please verify your information</p>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Phone className="h-4 w-4" />
          <span>{phoneNumber}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>{address}</span>
        </div>
      </div>
      <Button onClick={handleVerifyInfo} className="w-full">
        Confirm Information
      </Button>
      <Button onClick={handleLogout} variant="outline" className="w-full">
        Log Out / Switch Account
      </Button>
    </div>
  );
};
