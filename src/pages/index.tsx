import { type NextPageWithLayout } from "./_app";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "~/components/atoms/Button";
import { IconInfoCircle } from "@tabler/icons-react";
import MainLayout from "~/components/layouts/MainLayout";
import Link from "next/link";

const HomeButton: React.FC = () => {
  return (
    <>
      <SignedOut>
        <SignUpButton mode="modal">
          <Button>Try free now</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <Link href={"/generate"}>
          <Button>Generate</Button>
        </Link>
      </SignedIn>
    </>
  );
};

const Home: NextPageWithLayout = () => {
  return (
    <div className="mt-[15dvh] grid place-content-center gap-40 md:mt-[20dvh] lg:mt-[28dvh] lg:gap-12">
      <h2 className="leading-12 white text-center text-7xl font-black tracking-tighter dark:text-white lg:text-8xl">
        AI-generated objects
      </h2>
      <div className="flex justify-center gap-3">
        <HomeButton />
        <Button color="transparent" className="inline-flex items-center gap-2">
          <IconInfoCircle className="inline h-4 w-4" />
          <span>Learn More</span>
        </Button>
      </div>
    </div>
  );
};

Home.getLayout = MainLayout;
Home.protected = false;

export default Home;
