import { doSocialLogin } from "@/app/actions";
import React from "react";
import { Button } from "./ui/button";

const SocialLogin = () => {
  return (
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
  );
};

export default SocialLogin;
