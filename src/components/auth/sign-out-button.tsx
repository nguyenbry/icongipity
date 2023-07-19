import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { Button } from "../atoms/button";
import React from "react";

const MySignOutButton: React.FC = () => {
  return (
    <SignedIn>
      <SignOutButton>
        <Button variant="danger" className="hidden md:inline">
          Sign Out
        </Button>
      </SignOutButton>
    </SignedIn>
  );
};

export default MySignOutButton;
