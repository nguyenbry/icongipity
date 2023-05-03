import React from "react";
import { SignIn } from "@clerk/nextjs";
import { type NextPageWithLayout } from "../_app";

const SignInComponent: NextPageWithLayout = () => {
  return (
    <div className="mt-[20dvh] flex justify-center px-10">
      <SignIn
        appearance={{
          elements: {
            card: "bg-indigo-100",
          },
        }}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </div>
  );
};

SignInComponent.protected = false;
export default SignInComponent;
