// AuthSteps/PhoneVerificationStep.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PhoneVerificationStepProps {
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  handleCodeVerification: () => void;
}

export const PhoneVerificationStep: React.FC<PhoneVerificationStepProps> = ({
  verificationCode,
  setVerificationCode,
  handleCodeVerification,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-center">
        Enter the verification code sent to your phone
      </p>
      <Input
        placeholder="Enter verification code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <Button onClick={handleCodeVerification} className="w-full">
        Verify
      </Button>
    </div>
  );
};
