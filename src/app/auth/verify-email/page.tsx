"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CakeSlice,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

type VerifyState = "no-token" | "verifying" | "success" | "expired";

const BRAND_POINTS = [
  {
    icon: Zap,
    text: "Verified accounts get exclusive early access to deals",
  },
  {
    icon: Star,
    text: "Your reviews are trusted by the community",
  },
  {
    icon: ShieldCheck,
    text: "Faster checkout with saved preferences",
  },
];

function VerifyEmailInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [state, setState] = useState<VerifyState>(
    token ? "verifying" : "no-token"
  );
  const [resendEmail, setResendEmail] = useState("");
  const [resendSent, setResendSent] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!token) return;
    const timer = setTimeout(() => {
      if (token === "expired") {
        setState("expired");
      } else {
        setState("success");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [token]);

  async function handleResend() {
    if (!resendEmail.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    setResending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setResending(false);
    setResendSent(true);
    toast.success(`Verification email sent to ${resendEmail}.`);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
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
              One last step to your<br />sweet world
            </h1>
            <p className="text-amber-100 text-lg">
              Confirm your email to unlock everything Sweet Treats has to offer.
            </p>
          </div>

          <ul className="space-y-4">
            {BRAND_POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-amber-200 shrink-0" />
                <span className="text-amber-50">{text}</span>
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
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 md:hidden mb-8">
            <div className="bg-amber-100 rounded-lg p-1.5">
              <CakeSlice className="h-5 w-5 text-amber-700" />
            </div>
            <span className="font-bold text-amber-900">Sweet Treats</span>
          </div>

          {/* State: verifying */}
          {state === "verifying" && (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                <Loader2 className="h-7 w-7 text-amber-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Verifying your email&hellip;
              </h2>
              <p className="text-sm text-muted-foreground">
                This will only take a moment.
              </p>
            </div>
          )}

          {/* State: success */}
          {state === "success" && (
            <div className="flex flex-col items-center text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Email verified! 🎉
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your account is now active. Start exploring local treats.
                </p>
              </div>

              <div className="w-full space-y-3 pt-2">
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  asChild
                >
                  <Link href="/products">Browse treats</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/customer/profile">Go to your account</Link>
                </Button>
              </div>
            </div>
          )}

          {/* State: no-token */}
          {state === "no-token" && (
            <div className="flex flex-col items-center text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Invalid verification link
                </h2>
                <p className="text-sm text-muted-foreground">
                  This link is missing a token. Please check the email we sent
                  you or request a new link below.
                </p>
              </div>

              {!resendSent ? (
                <div className="w-full space-y-3 pt-2">
                  <div>
                    <Label htmlFor="resend-email-notok">Email address</Label>
                    <Input
                      id="resend-email-notok"
                      type="email"
                      className="mt-1"
                      placeholder="you@example.com"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    disabled={resending}
                    onClick={handleResend}
                  >
                    {resending ? "Sending…" : "Resend verification email"}
                  </Button>
                </div>
              ) : (
                <div className="w-full rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-800 text-center">
                  Check your inbox — a new verification email is on its way!
                </div>
              )}

              <Link
                href="/auth/login"
                className="text-sm text-amber-700 hover:text-amber-800 font-medium"
              >
                Back to sign in
              </Link>
            </div>
          )}

          {/* State: expired */}
          {state === "expired" && (
            <div className="flex flex-col items-center text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Verification link expired
                </h2>
                <p className="text-sm text-muted-foreground">
                  Links are valid for 24 hours. Request a new one below.
                </p>
              </div>

              {!resendSent ? (
                <div className="w-full space-y-3 pt-2">
                  <div>
                    <Label htmlFor="resend-email">Email address</Label>
                    <Input
                      id="resend-email"
                      type="email"
                      className="mt-1"
                      placeholder="you@example.com"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    disabled={resending}
                    onClick={handleResend}
                  >
                    {resending
                      ? "Sending…"
                      : "Resend verification email"}
                  </Button>
                </div>
              ) : (
                <div className="w-full rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-800 text-center">
                  Check your inbox — a fresh verification link is on its way!
                </div>
              )}

              <Link
                href="/auth/login"
                className="text-sm text-amber-700 hover:text-amber-800 font-medium"
              >
                Back to sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        </div>
      }
    >
      <VerifyEmailInner />
    </Suspense>
  );
}
