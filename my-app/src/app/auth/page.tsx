"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginForm from "./login/page";
import RegistrationForm from "./registration/page";

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
