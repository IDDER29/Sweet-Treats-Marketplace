import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Welcome = ({ phoneNumber, setPhoneNumber, handlePhoneSubmit }) => {
  return (
    <>
      <div className="space-y-4">
        <p className="text-center">Let's start with your phone number</p>
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
          <Button onClick={() => handlePhoneSubmit()}>SMS</Button>
          <Button onClick={() => handlePhoneSubmit()}>WhatsApp</Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              or with
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
