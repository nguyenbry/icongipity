import { type NextPageWithLayout } from "./_app";
import { SignUpButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "~/components/atoms/Button";
import { IconInfoCircle } from "@tabler/icons-react";
import MainLayout from "~/components/layouts/MainLayout";

const HomeButton: React.FC = () => {
  return (
    <>
      <SignedOut>
        <SignUpButton mode="modal">
          <Button>Try free now</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <Button>Generate</Button>
      </SignedIn>
    </>
  );
};

const Home: NextPageWithLayout = () => {
  const user = useUser();

  console.log("user", user);

  return (
    <div className="mt-[15dvh] grid place-content-center gap-40 md:mt-[20dvh] lg:mt-[28dvh] lg:gap-12">
      <h2 className="leading-12 white text-center text-7xl font-semibold tracking-tighter dark:text-white">
        AI-generated icons
      </h2>
      <div className="flex justify-center gap-3">
        <HomeButton />
        <Button color="transparent" className="inline-flex gap-1">
          <IconInfoCircle className="inline" size={20} />
          <span>Learn More</span>
        </Button>
      </div>
    </div>
  );
};

Home.getLayout = MainLayout;
Home.protected = false;

export default Home;
