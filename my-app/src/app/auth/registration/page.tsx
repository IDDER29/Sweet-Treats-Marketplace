import React from "react";
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

export default function BusinessRegistration() {
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
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                id="business-name"
                name="business-name"
                type="text"
                required
                className="mt-1"
                placeholder="Your Bakery Name"
              />
            </div>
            <div>
              <Label htmlFor="email-address">Email address</Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                placeholder="bakery@example.com"
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
              />
            </div>
            <div>
              <Label htmlFor="business-type">Business Type</Label>
              <Select>
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
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
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
