"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CakeSlice,
  CheckCircle2,
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  AlertCircle,
} from "lucide-react";

function PasswordStrengthBar({ password }: { password: string }) {
  const strength =
    password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 9 ? 2 : 3;
  const labels = ["", "Weak", "Good", "Strong"];
  const colors = ["", "bg-red-500", "bg-yellow-400", "bg-green-500"];
  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= strength ? colors[strength] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      {strength > 0 && (
        <p className={`text-xs ${strength === 1 ? "text-red-500" : strength === 2 ? "text-yellow-600" : "text-green-600"}`}>
          {labels[strength]}
        </p>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const mismatch = confirm.length > 0 && password !== confirm;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      // TODO(backend): POST { token, password } to /auth/reset-password
      await new Promise((r) => setTimeout(r, 800));
      setDone(true);
    } catch {
      setError("This reset link has expired or is invalid. Please request a new one.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Brand panel */}
      <div className="hidden md:flex md:w-3/5 bg-gradient-to-br from-amber-600 to-orange-700 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-xl p-2">
            <CakeSlice className="h-7 w-7 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Sweet Treats</span>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Almost back in<br />your sweet world
          </h1>
          <p className="text-amber-100 text-lg">
            Choose a strong new password to keep your account safe and get
            back to discovering local treats.
          </p>
          <ul className="space-y-3">
            {[
              "Use at least 6 characters",
              "Mix letters, numbers and symbols",
              "Avoid passwords you use elsewhere",
            ].map((tip) => (
              <li key={tip} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-200 shrink-0" />
                <span className="text-amber-50 text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-amber-200 text-sm">
          &copy; {new Date().getFullYear()} Sweet Treats Marketplace
        </p>
      </div>

      {/* Form panel */}
      <div className="w-full md:w-2/5 flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="bg-amber-100 rounded-lg p-1.5">
              <CakeSlice className="h-5 w-5 text-amber-700" />
            </div>
            <span className="font-bold text-amber-900">Sweet Treats</span>
          </div>

          {!token ? (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Invalid link</h2>
                <p className="text-sm text-gray-500">
                  This password-reset link is missing a token. Please request a
                  new one.
                </p>
              </div>
              <Link href="/auth/forgot-password">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Request new link
                </Button>
              </Link>
            </div>
          ) : done ? (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Password updated!</h2>
                <p className="text-sm text-gray-500">
                  Your password has been changed successfully. Sign in to
                  continue.
                </p>
              </div>
              <Link href="/auth/login">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Sign in
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                  <Lock className="h-7 w-7 text-amber-700" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Set new password
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose a new password for your account.
                  </p>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <Label htmlFor="password">New password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      className="pr-10"
                      placeholder="Min. 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <PasswordStrengthBar password={password} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <div className="relative">
                    <Input
                      id="confirm"
                      type={showConfirm ? "text" : "password"}
                      required
                      className={`pr-10 ${mismatch ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                      placeholder="Repeat your password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {mismatch && (
                    <p className="text-xs text-red-500">Passwords do not match.</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading || mismatch}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                >
                  {loading ? "Updating…" : "Update password"}
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
