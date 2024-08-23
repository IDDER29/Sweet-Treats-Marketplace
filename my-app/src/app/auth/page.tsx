"use client";
import { useState } from "react";
import { User, Mail, Lock, UserCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegistrationForm = () => {
  const [userType, setUserType] = useState("customer");

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Join SweetTreats Marketplace today</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="John Doe" className="pl-8" />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="john@example.com"
                  type="email"
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" className="pl-8" />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="confirmPassword" type="password" className="pl-8" />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>User Type</Label>
              <RadioGroup defaultValue="customer" onValueChange={setUserType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="customer" id="customer" />
                  <Label htmlFor="customer">Customer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="business" id="business" />
                  <Label htmlFor="business">Business Owner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">Delivery Provider</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Register</Button>
      </CardFooter>
    </Card>
  );
};

const LoginForm = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Welcome back to SweetTreats Marketplace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="john@example.com"
                  type="email"
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" className="pl-8" />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button className="w-full mb-2">Login</Button>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </CardFooter>
    </Card>
  );
};

export default function Component() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      {isLogin ? <LoginForm /> : <RegistrationForm />}
      <p className="mt-4">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </Button>
      </p>
    </div>
  );
}
