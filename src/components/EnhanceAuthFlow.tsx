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
import {
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
// Simulated API functions (replace with actual API calls in production)
const simulateApiCall = (data: any) =>
  new Promise((resolve) => setTimeout(() => resolve(data), 1000));
const simulateUserCheck = () =>
  simulateApiCall({ exists: Math.random() > 0.5 });
const simulateAuth = () =>
  simulateApiCall({ success: true, userId: "user123" });
const simulateVerifyCode = (code: string) =>
  simulateApiCall({ success: code === "1234" });
const simulateSaveAddress = (address: string) =>
  simulateApiCall({ success: true });

export function EnhancedAuthFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("welcome");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const savedProgress = localStorage.getItem("authProgress");
    if (savedProgress) {
      const { step, phoneNumber, email, address } = JSON.parse(savedProgress);
      setStep(step);
      setPhoneNumber(phoneNumber);
      setEmail(email);
      setAddress(address);
    }
  }, []);

  useEffect(() => {
    if (step !== "welcome" && step !== "complete") {
      localStorage.setItem(
        "authProgress",
        JSON.stringify({ step, phoneNumber, email, address })
      );
    }
  }, [step, phoneNumber, email, address]);

  const handlePhoneSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate sending verification code
      await simulateApiCall({ success: true });
      setStep("verifyPhone");
      toast({
        title: "Verification code sent",
        description: "Please check your phone for the code.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeVerification = async () => {
    setIsLoading(true);
    try {
      const result = await simulateVerifyCode(verificationCode);
      if (result.success) {
        const userCheck = await simulateUserCheck();
        setStep(userCheck.exists ? "verifyInfo" : "addAddress");
      } else {
        toast({
          title: "Invalid code",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Verification failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSubmit = async () => {
    setIsLoading(true);
    try {
      await simulateSaveAddress(address);
      setStep("verifyInfo");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save address. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async (
    method: "phone" | "google" | "facebook" | "email"
  ) => {
    setIsLoading(true);
    try {
      const result = await simulateAuth();
      if (result.success) {
        setIsAuthenticated(true);
        setUserId(result.userId);
        const userCheck = await simulateUserCheck();
        setStep(userCheck.exists ? "verifyInfo" : "addAddress");
      }
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserId("");
    setStep("welcome");
    localStorage.removeItem("authProgress");
  };

  const handleBack = () => {
    switch (step) {
      case "verifyPhone":
        setStep("welcome");
        break;
      case "addAddress":
        setStep("verifyPhone");
        break;
      case "verifyInfo":
        if (!isAuthenticated) {
          setStep("addAddress");
        }
        break;
      default:
        setStep("welcome");
    }
  };

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
              : step === "addAddress"
              ? "Add Your Address"
              : step === "verifyInfo"
              ? "Verify Your Information"
              : "Authentication"}
          </DialogTitle>
        </DialogHeader>

        {step !== "welcome" && step !== "verifyInfo" && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-4"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Go back</span>
          </Button>
        )}

        {step === "welcome" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <div className="flex space-x-2">
                <Input id="prefix" value="+212" disabled className="w-1/4" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-3/4"
                />
              </div>
            </div>
            <Button
              onClick={() => handleAuth("phone")}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Continue with Phone"}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleAuth("google")}
              disabled={isLoading}
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleAuth("facebook")}
              disabled={isLoading}
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                ></path>
              </svg>
              Continue with Facebook
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setStep("emailAuth")}
              disabled={isLoading}
            >
              <Mail className="mr-2 h-4 w-4" />
              Continue with Email
            </Button>
          </div>
        )}

        {step === "emailAuth" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <Button
              onClick={() => handleAuth("email")}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Sign In"}
            </Button>
          </div>
        )}

        {step === "verifyPhone" && (
          <div className="space-y-4">
            <p className="text-center">We've sent a code to {phoneNumber}</p>
            <Input
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button
              onClick={handleCodeVerification}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>
          </div>
        )}

        {step === "addAddress" && (
          <div className="space-y-4">
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea
              id="address"
              placeholder="Enter your full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              onClick={handleAddressSubmit}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Address"}
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
            <Button onClick={() => setStep("complete")} className="w-full">
              Confirm Information
            </Button>
            {!isAuthenticated && (
              <>
                <Button
                  onClick={() => setStep("welcome")}
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
              </>
            )}
            <Button onClick={handleLogout} variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        )}

        {step === "complete" && (
          <div className="space-y-4">
            <p className="text-center">Authentication complete!</p>
            <Button
              onClick={() => {
                setIsOpen(false);
                localStorage.removeItem("authProgress");
              }}
              className="w-full"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
