import React from "react";
import { SignUp } from "@clerk/nextjs";
import { type NextPageWithLayout } from "../_app";

const SignUpComponent: NextPageWithLayout = () => {
  return (
    <div className="mt-[20dvh] flex justify-center px-10">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
};

SignUpComponent.protected = false;
export default SignUpComponent;
