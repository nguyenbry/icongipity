import React from "react";
import { SignIn } from "@clerk/nextjs";
import { type NextPageWithLayout } from "~/types/NextPageWithLayout";

const SignInPage: NextPageWithLayout = () => {
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

SignInPage.protected = false;
export default SignInPage;
