"use client";
import { useState } from "react";
import { publicApi } from "@/lib/api-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CakeSlice, CheckCircle2, KeyRound, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await publicApi.post("/auth/forgot-password", { email });
    } catch {
      // Intentionally silent — always show the "check inbox" confirmation
      // so we never reveal whether an account exists for this address.
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

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

          {submitted ? (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Check your inbox</h2>
                <p className="text-sm text-gray-500">
                  If an account exists for{" "}
                  <span className="font-semibold text-gray-700">{email}</span>,
                  you will receive an email with reset instructions shortly.
                </p>
              </div>
              <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-800">
                Didn&apos;t receive it? Check your spam folder or try again in a
                few minutes.
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSubmitted(false)}
              >
                Try a different email
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                  <KeyRound className="h-7 w-7 text-amber-700" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Reset your password
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter your email and we&apos;ll send you a link to reset
                    your password.
                  </p>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                >
                  {loading ? "Sending…" : "Send reset link"}
                </Button>
              </form>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
