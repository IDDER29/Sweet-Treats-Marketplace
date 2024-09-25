// components/AuthFlow.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import SocialMediaAuth from "./AuthSteps/SocialMediaAuth";
import Welcome from "./AuthSteps/Welcome";
import { PhoneNumberStep } from "./AuthSteps/PhoneNumberStep";
import { PhoneVerificationStep } from "./AuthSteps/PhoneVerificationStep";
import { AddressStep } from "./AuthSteps/AddressStep";
import { VerifyInfoStep } from "./AuthSteps/VerifyInfoStep";
import { CompleteStep } from "./AuthSteps/CompleteStep";

// Simulated user data - replace with actual API calls in a real application
const simulatedUserData = {
  email: "idder@gmail.com",
  phone: "",
  address: "",
};

// Enumeration for Auth Steps
enum AuthSteps {
  WELCOME = "welcome",
  ADD_PHONE = "addPhone",
  VERIFY_PHONE = "verifyPhone",
  ADD_ADDRESS = "addAddress",
  VERIFY_INFO = "verifyInfo",
  COMPLETE = "complete",
}

interface UserData {
  phone: string;
  verificationCode: string;
  email: string;
  address: string;
}

export function AuthFlow() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [step, setStep] = useState<AuthSteps>(AuthSteps.WELCOME);
  const [userData, setUserData] = useState<UserData>({
    phone: "",
    verificationCode: "",
    email: "",
    address: "",
  });
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedStep = localStorage.getItem("authFlowStep") as AuthSteps;
    const savedUserData = localStorage.getItem("authFlowUserData");
    const savedIsExistingUser = localStorage.getItem("authFlowIsExistingUser");

    if (savedStep) setStep(savedStep);
    if (savedUserData) setUserData(JSON.parse(savedUserData));
    if (savedIsExistingUser) setIsExistingUser(savedIsExistingUser === "true");
  }, []);

  // Save progress to localStorage whenever step or userData changes
  useEffect(() => {
    localStorage.setItem("authFlowStep", step);
    localStorage.setItem("authFlowUserData", JSON.stringify(userData));
    localStorage.setItem("authFlowIsExistingUser", String(isExistingUser));
  }, [step, userData, isExistingUser]);

  // Simulate checking user existence (replace with actual API call)
  const checkUserExistence = (phone: string): boolean => {
    console.log("Checking if user exists with phone number:", phone);
    return phone === simulatedUserData.phone;
  };

  // Handle Social Media Authentication
  const handleSocialAuth = (provider: "google" | "facebook") => {
    console.log(`Authenticating with ${provider}`);
    const authenticated = true; // Replace with actual authentication result

    if (authenticated) {
      const userExists = checkUserExistence(simulatedUserData.phone);
      setIsExistingUser(userExists);
      if (userExists) {
        if (simulatedUserData.phone && simulatedUserData.address) {
          setUserData({
            phone: simulatedUserData.phone,
            address: simulatedUserData.address,
            email: simulatedUserData.email,
            verificationCode: "",
          });
          setStep(AuthSteps.VERIFY_INFO);
        } else {
          setStep(
            simulatedUserData.phone
              ? AuthSteps.ADD_ADDRESS
              : AuthSteps.ADD_PHONE
          );
        }
      } else {
        setStep(AuthSteps.ADD_PHONE);
      }
    }
  };

  // Handle Phone Number Submission
  const handlePhoneSubmit = (method: "sms" | "whatsapp") => {
    console.log(`Phone number submitted via ${method}:`, userData.phone);
    setStep(AuthSteps.VERIFY_PHONE);
  };

  // Handle Verification Code Submission
  const handleCodeVerification = () => {
    console.log("Verifying code:", userData.verificationCode);
    if (userData.verificationCode === "1234") {
      if (isExistingUser) {
        setStep(AuthSteps.VERIFY_INFO);
      } else {
        setStep(AuthSteps.ADD_ADDRESS);
      }
    } else {
      alert("Invalid verification code. Please try again.");
    }
  };

  // Handle Address Submission
  const handleAddressSubmit = () => {
    console.log("Address submitted:", userData.address);
    setStep(AuthSteps.VERIFY_INFO);
  };

  // Handle Final Verification
  const handleVerifyInfo = () => {
    console.log("Information verified and process completed.");
    setStep(AuthSteps.COMPLETE);
    localStorage.removeItem("authFlowStep");
    localStorage.removeItem("authFlowUserData");
    localStorage.removeItem("authFlowIsExistingUser");
  };

  // Handle Logout or Switch Account
  const handleLogout = () => {
    console.log("User logged out.");
    setStep(AuthSteps.WELCOME);
    setUserData({
      phone: "",
      verificationCode: "",
      email: "",
      address: "",
    });
    setIsExistingUser(false);
    localStorage.removeItem("authFlowStep");
    localStorage.removeItem("authFlowUserData");
    localStorage.removeItem("authFlowIsExistingUser");
  };

  // Update User Data
  const updateUserData = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Get Step Title
  const getStepTitle = (currentStep: AuthSteps): string => {
    switch (currentStep) {
      case AuthSteps.WELCOME:
        return "Welcome";
      case AuthSteps.ADD_PHONE:
        return "Add Your Phone Number";
      case AuthSteps.VERIFY_PHONE:
        return "Verify Your Phone";
      case AuthSteps.ADD_ADDRESS:
        return "Add Your Address";
      case AuthSteps.VERIFY_INFO:
        return "Verify Your Information";
      case AuthSteps.COMPLETE:
        return "Registration Complete";
      default:
        return "Welcome";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In / Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getStepTitle(step)}</DialogTitle>
        </DialogHeader>

        {step === AuthSteps.WELCOME && (
          <>
            <Welcome
              phoneNumber={userData.phone}
              setPhoneNumber={(value: string) => updateUserData("phone", value)}
              handlePhoneSubmit={handlePhoneSubmit}
            />
            <SocialMediaAuth
              googleAuth={() => handleSocialAuth("google")}
              facebookAuth={() => handleSocialAuth("facebook")}
            />
          </>
        )}

        {step === AuthSteps.ADD_PHONE && (
          <PhoneNumberStep
            phoneNumber={userData.phone}
            setPhoneNumber={(value: string) => updateUserData("phone", value)}
            handlePhoneSubmit={handlePhoneSubmit}
          />
        )}

        {step === AuthSteps.VERIFY_PHONE && (
          <PhoneVerificationStep
            verificationCode={userData.verificationCode}
            setVerificationCode={(value: string) =>
              updateUserData("verificationCode", value)
            }
            handleCodeVerification={handleCodeVerification}
          />
        )}

        {step === AuthSteps.ADD_ADDRESS && (
          <AddressStep
            address={userData.address}
            setAddress={(value: string) => updateUserData("address", value)}
            handleAddressSubmit={handleAddressSubmit}
          />
        )}

        {step === AuthSteps.VERIFY_INFO && (
          <VerifyInfoStep
            phoneNumber={userData.phone}
            address={userData.address}
            handleVerifyInfo={handleVerifyInfo}
            handleLogout={handleLogout}
          />
        )}

        {step === AuthSteps.COMPLETE && (
          <CompleteStep handleClose={() => setIsOpen(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AuthFlow;
