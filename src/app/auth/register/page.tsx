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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CakeSlice, CheckCircle2 } from "lucide-react";

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
        router.push("/auth/login");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Failed to register business. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel — hidden on mobile */}
      <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-amber-600 to-orange-700 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-xl p-2">
            <CakeSlice className="h-7 w-7 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Sweet Treats</span>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight">
              Start selling your<br />sweet treats today
            </h1>
            <p className="text-amber-100 text-lg">
              Join hundreds of bakeries already on the platform.
            </p>
          </div>

          <ul className="space-y-4">
            {[
              "Reach new customers in your area",
              "Easy setup — live in minutes",
              "Real-time order notifications",
            ].map((point) => (
              <li key={point} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-200 shrink-0" />
                <span className="text-amber-50">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-amber-200 text-sm">
          &copy; {new Date().getFullYear()} Sweet Treats Marketplace
        </p>
      </div>

      {/* Right form panel */}
      <div className="w-full md:w-3/5 flex flex-col justify-center items-center p-6 sm:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-lg space-y-6 py-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="bg-amber-100 rounded-lg p-1.5">
              <CakeSlice className="h-5 w-5 text-amber-700" />
            </div>
            <span className="font-bold text-amber-900">Sweet Treats</span>
          </div>

          <div>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1">
              Business Registration
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Create your seller account
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill in your details to get started on the marketplace.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Personal Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
                Personal Info
              </h3>
              <div className="flex gap-3 w-full">
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
                  placeholder="+1 234 567 890"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Business Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
                Business Details
              </h3>
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
            </div>

            {/* Account Setup */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
                Account Setup
              </h3>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1"
                  placeholder="you@example.com"
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
            </div>

            <div className="flex items-start gap-3">
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
                className="mt-0.5"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 leading-snug cursor-pointer"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-amber-700 hover:underline font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-amber-700 hover:underline font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            >
              Register Business
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-amber-700 hover:text-amber-800"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
