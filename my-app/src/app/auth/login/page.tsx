import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { doSocialLogin } from "@/app/actions";

export default function BusinessSignIn() {
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
        <form className="mt-8 space-y-6" action={doSocialLogin} method="POST">
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

        <form action={doSocialLogin}>
          <div>
            <Button
              type="submit"
              name="action"
              value="google"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Sign in With google
            </Button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            className="font-medium text-primary hover:text-primary/80"
          >
            Register your business
          </a>
        </p>
      </div>
    </div>
  );
}
