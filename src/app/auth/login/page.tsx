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
import { CakeSlice, CheckCircle2 } from "lucide-react";

export default function BusinessSignIn() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel — hidden on mobile */}
      <div className="hidden md:flex md:w-3/5 bg-gradient-to-br from-amber-600 to-orange-700 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-xl p-2">
            <CakeSlice className="h-7 w-7 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Sweet Treats</span>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight">
              Discover the sweetest<br />local treats
            </h1>
            <p className="text-amber-100 text-lg">
              Your neighbourhood bakeries, one tap away.
            </p>
          </div>

          <ul className="space-y-4">
            {[
              "Browse 200+ bakeries near you",
              "Fresh daily delivery to your door",
              "Support local businesses you love",
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
      <div className="w-full md:w-2/5 flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="bg-amber-100 rounded-lg p-1.5">
              <CakeSlice className="h-5 w-5 text-amber-700" />
            </div>
            <span className="font-bold text-amber-900">Sweet Treats</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to your account to continue
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleFormSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email-address">Email address</Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1"
                  placeholder="you@example.com"
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
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="text-sm font-normal cursor-pointer">
                  Remember me
                </Label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-amber-700 hover:text-amber-800"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              name="action"
              value="logIn"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400 bg-white px-2">
              <span className="bg-white px-2">or continue with</span>
            </div>
          </div>

          <SocialLogin />

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-amber-700 hover:text-amber-800"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
