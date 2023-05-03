import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "../atoms/Button";
import React from "react";

const MySignInButton: React.FC = () => {
  return (
    <SignedOut>
      <SignInButton mode="modal">
        <Button>Sign In</Button>
      </SignInButton>
    </SignedOut>
  );
};

export default MySignInButton;
