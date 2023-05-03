import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { Button } from "../atoms/Button";
import React from "react";

const MySignOutButton: React.FC = () => {
  return (
    <SignedIn>
      <SignOutButton>
        <Button color="red">Sign Out</Button>
      </SignOutButton>
    </SignedIn>
  );
};

export default MySignOutButton;
