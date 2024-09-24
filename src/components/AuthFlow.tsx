"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Phone, MapPin } from "lucide-react";

import SocialMediaAuth from "./AuthSteps/SocialMediaAuth";
import Welcome from "./AuthSteps/Welcome";
// Simulated user data - replace with actual API calls in a real application
const simulatedUserData = {
  email: "user@example.com",
  phone: "+212612345678",
  address: "123 Main St, Casablanca, Morocco",
};

export function AuthFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("welcome");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false);

  const handleGoogleAuth = () => {
    // Simulate Google authentication
    console.log("Authenticating with Google");
    checkUserExistence(true);
  };

  const handleFacebookAuth = () => {
    // Simulate Facebook authentication
    console.log("Authenticating with Facebook");
    checkUserExistence(true);
  };

  const checkUserExistence = (authenticated: boolean) => {
    if (authenticated) {
      if (false) {
        setStep("verifyInfo");
      } else if (phoneNumber && verificationCode) {
        setStep("addAddress");
      } else {
        setStep("addPhone");
      }
    }
  };

  const handlePhoneSubmit = () => {
    console.log("Phone number submitted:", phoneNumber);
    setStep("verifyPhone");
  };

  const handleCodeVerification = () => {
    console.log("Verifying code:", verificationCode);
    setStep(isExistingUser ? "verifyInfo" : "Authenticate");
  };

  const handleAddressSubmit = () => {
    console.log("Address submitted:", address);
    setStep("verifyInfo");
  };

  const handleVerifyInfo = () => {
    console.log("Information verified");
    setStep("complete");
  };

  useEffect(() => {
    if (isExistingUser) {
      setPhoneNumber(simulatedUserData.phone);
      setAddress(simulatedUserData.address);
    }
  }, [isExistingUser]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In / Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {step === "welcome"
              ? "Welcome"
              : step === "verifyPhone"
              ? "Verify Your Phone"
              : step === "addPhone"
              ? "Add Your Phone Number"
              : step === "addAddress"
              ? "Add Your Address"
              : step === "verifyInfo"
              ? "Verify Your Information"
              : step === "complete"
              ? "Registration Complete"
              : "Authenticate"}
          </DialogTitle>
        </DialogHeader>

        {step === "welcome" && (
          <>
            <Welcome
              handlePhoneSubmit={handleAddressSubmit}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />{" "}
            <SocialMediaAuth
              googleAuth={handleGoogleAuth}
              facebookAuth={handleFacebookAuth}
            />
          </>
        )}
        {step === "Authenticate" && (
          <SocialMediaAuth
            googleAuth={handleGoogleAuth}
            facebookAuth={handleFacebookAuth}
          />
        )}
        {step === "verifyPhone" && (
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
        )}

        {step === "addPhone" && (
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
            <Button onClick={() => setStep("verifyPhone")} className="w-full">
              Send Verification Code
            </Button>
          </div>
        )}

        {step === "addAddress" && (
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
        )}

        {step === "verifyInfo" && (
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
            <Button
              onClick={() => setStep("addPhone")}
              variant="outline"
              className="w-full"
            >
              Update Phone
            </Button>
            <Button
              onClick={() => setStep("addAddress")}
              variant="outline"
              className="w-full"
            >
              Update Address
            </Button>
          </div>
        )}

        {step === "emailSignIn" && (
          <div className="space-y-4">
            <p className="text-center">Sign in with your email</p>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={() => setStep("welcome")} className="w-full">
              Continue
            </Button>
          </div>
        )}

        {step === "complete" && (
          <div className="space-y-4">
            <p className="text-center">Registration complete!</p>
            <Button onClick={() => setIsOpen(false)} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
