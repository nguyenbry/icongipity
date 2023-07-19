import React from "react";
import { SignUp } from "@clerk/nextjs";
import { type NextPageWithLayout } from "~/types/next-page-with-layout";

const SignUpPage: NextPageWithLayout = () => {
  return (
    <div className="mt-[20dvh] flex justify-center px-10">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
};

SignUpPage.protected = false;
export default SignUpPage;
