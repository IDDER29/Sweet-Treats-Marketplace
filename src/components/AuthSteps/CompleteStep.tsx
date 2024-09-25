// AuthSteps/CompleteStep.tsx
import React from "react";
import { Button } from "@/components/ui/button";

interface CompleteStepProps {
  handleClose: () => void;
}

export const CompleteStep: React.FC<CompleteStepProps> = ({ handleClose }) => {
  return (
    <div className="space-y-4 text-center">
      <p>Registration complete!</p>
      <Button onClick={handleClose} className="w-full">
        Close
      </Button>
    </div>
  );
};
