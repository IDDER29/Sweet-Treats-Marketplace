"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO(backend): POST the email to a password-reset endpoint. The
    // confirmation below is intentionally generic so we never reveal whether
    // an account exists for a given address.
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email and we will send you a link to reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-md border border-green-300 bg-green-50 p-4 text-sm text-green-800">
            If an account exists for <strong>{email}</strong>, you will receive
            an email with reset instructions shortly.
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground">
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
