"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { registerBusiness } from "@/utils/api";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function BusinessRegistration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    password: "",
    businessType: "",
    address: "",
    phoneNumber: "",
    agreeToTerms: true,
  });

  const [error, setError] = useState("");
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      setError("");
      const response = await registerBusiness(formData);

      if (response.success) {
        // Redirect to the login page after successful registration
        router.push("/auth/login");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Failed to register business. Please try again later.");
    }
  };
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Register Your Bakery Business
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join our marketplace and reach more customers
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="flex gap-2 w-full">
              <div className="flex-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                required
                className="mt-1"
                placeholder="+1234567890"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                name="businessName"
                type="text"
                required
                className="mt-1"
                placeholder="Your Bakery Name"
                value={formData.businessName}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                name="businessType"
                value={formData.businessType}
                onValueChange={(value) =>
                  handleChange({
                    target: { name: "businessType", value },
                  } as any)
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bakery">Bakery</SelectItem>
                  <SelectItem value="cafe">Café</SelectItem>
                  <SelectItem value="patisserie">Patisserie</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="address">Business Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                required
                className="mt-1"
                placeholder="123 Bakery St, City, State, ZIP"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                placeholder="bakery@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onClick={() => {
                  setFormData({
                    ...formData,
                    agreeToTerms: !formData.agreeToTerms,
                  });
                  setError("");
                }}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions
              </label>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Register Business
            </Button>
          </div>
        </form>
        {error && (
          <p className="mt-2 text-center text-sm text-red-500">{error}</p>
        )}
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
