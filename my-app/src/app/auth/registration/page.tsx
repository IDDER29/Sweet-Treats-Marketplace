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
    agreeToTerms: false,
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? e.target.checked : false;
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
      await registerBusiness(formData);
      // Handle successful registration here (e.g., redirect or show a success message)
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Failed to register business. Please try again.");
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
        {error && (
          <p className="mt-2 text-center text-sm text-red-500">{error}</p>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="flex gap-2">
              <div>
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
              <div>
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
                onChange={handleChange}
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
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
