"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { doSocialLogin } from "@/app/actions";
import SocialLogin from "@/components/SocialLogin";
import { doCredentialLogin } from "@/app/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BusinessSignIn() {
  const router = useRouter();
  const [error, setError] = useState("");
  async function handleFormSubmit(event: any) {
    event.preventDefault();
    try {
      setError("");
      const formData = new FormData(event.currentTarget);
      const response = await doCredentialLogin(formData);
      if (!!response.error) {
        setError(response.error.message);
      } else {
        router.push("/business/profile");
      }
    } catch (error) {
      setError("Invalid credentials");
    }
  }
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome back to the Bakery Marketplace
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
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
                autoComplete="current-password"
                required
                className="mt-1"
                placeholder="••••••••"
              />
            </div>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full mb-4">
              {error}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember-me" />
              <Label htmlFor="remember-me" className="ml-2 block text-sm">
                Remember me
              </Label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              name="action"
              value="logIn"
              className="w-full"
            >
              Sign in
            </Button>
          </div>
        </form>

        <hr />

        <SocialLogin />

        <p className="mt-2 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-primary hover:text-primary/80"
          >
            Register your business
          </Link>
        </p>
      </div>
    </div>
  );
}
